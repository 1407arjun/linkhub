import Head from '../../components/uni/head'
import Footer from '../../components/uni/footer'
import SearchBar from '../../components/uni/searchbar'
import PostMini from '../../components/posts/post-mini'
import NavBar from '../../components/uni/navbar'
import { useState, useEffect } from 'react'
import { getSession, useSession } from 'next-auth/react'
import getPost from '../../server/services/read/post'
import client from '../../server/loaders/database'
import { useRouter } from 'next/router'

export default function Post(props) {
    const router = useRouter()
    const { data: session, status } = useSession()
    const [navStatus, setNavStatus] = useState(false)
    const [windowSize, setWindowSize] = useState()

    useEffect(() => {
        if (props.postData.error) {
            alert(JSON.stringify(data))
            router.replace("/home")
        }     
    })

    useEffect(() => {
        setWindowSize(window.innerWidth)
        window.addEventListener('resize', (ev) => { setWindowSize(ev.path[0].innerWidth) })

        if (windowSize >= 768)
            setNavStatus(true)
        else
            setNavStatus(false)
    }, [windowSize])

    const { error, data } = props.postData
    if (error)
        window.alert(JSON.stringify(data))

    return (
        <div className="dark:bg-black">
            <Head title={  "Post by " + data.author.name.split(" ")[0] + " \u00b7 LinkHub" }/>
            <div className="flex flex-row justify-center items-start min-h-screen">
                { status === "authenticated" && navStatus && <NavBar navstatus={ navStatus } update={ setNavStatus } current="Explore"/> }
                <div className={ "flex flex-col gap-6 justify-start items-center" + (status === "authenticated" ? (( navStatus ? " w-5/6 " : " w-full ") + "md:w-5/6 lg:w-11/12 xl:w-5/6 p-4") : " w-full md:w-5/6 lg:w-11/12 xl:w-5/6 p-4 border-l border-r border-gray-300 dark:border-gray-600 min-h-screen") }>
                    <div className="w-full flex flex-row justify-start items-center gap-4">
                        { status === "authenticated" && !navStatus && <button onClick={ () => {setNavStatus(!navStatus)} } className="inline md:hidden w-10"><img src="/assets/home/menu.svg" className="w-full dark:filter dark:invert" alt="Nav"/></button> }
                        <SearchBar placeholder="What would you like to learn today?" smhidesearch={ false }/>
                    </div>
                    <div className="flex flex-row flex-nowrap justify-between items-center w-full px-4 gap-4">
                        <img src="/assets/posts/link-45.svg" className="w-8 md:w-12 filter invert dark:invert-0" alt=""/>
                        <div className="flex flex-col justify-start items-center gap-1 w-full">
                            <h2 className="w-full font-bold text-2xl md:text-3xl text-left dark:text-white">{ data.title }</h2>
                            <p className="w-full text-left text-base md:text-lg xl:text-xltext-gray-500 dark:text-gray-300">{ "At " + new Date(data.date.toLocaleString()) }</p>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-start w-full px-2 sm:px-4 gap-2 sm:gap-4">
                        <PostMini id={ data._id.toString() } name={ data.author.name }
                            username={ data.author.username }
                            email = { data.author.email }
                            image={ data.author.image }
                            title={ data.title }
                            body={ data.body }
                            tags={ data.tags }
                            date={ data.date }
                            upvotes={ data.upvotes }
                            downvotes={ data.downvotes }
                            flags={ data.flags }
                            option={ props.user ? (props.user.upvoted.includes(data._id) ? "upvoted" : 
                                (props.user.downvoted.includes(data._id) ? "downvoted" : 
                                (props.user.flagged.includes(data._id) ? "flagged" : null))) : null }
                            saved ={ props.user && props.user.saved.includes(data._id) }
                            delete ={ props.user && props.user.email === data.author.email }/>
                    </div>
                    <p className="text-sm md:text-base italic dark:text-white">-- You have reached the end --</p>
                </div>
            </div>
            { status === "authenticated" ? <Footer username={ props.user.username } signedin={ true }/> : <Footer signedin={ false }/>}
        </div>
    )
}

export async function getServerSideProps(context) {
    const session = await getSession(context)
    const { post } = context.query

    if (post !== post.toLowerCase())
        return {
            redirect: {
                destination: "/post/" + post.toLowerCase()
            }     
        }

    const postData = JSON.parse(JSON.stringify(await getPost(post)))
    
    if (postData.data) {
        if (session) {
            const mClient = await client
            const profile = JSON.parse(JSON.stringify(await mClient.db("Client").collection("profiles").findOne({email: session.user.email})))
            
            if (!profile)
                return {
                    redirect: {
                    destination: "/complete/username"
                    },
                    props: {}
                }
            else
                return {
                    props: { user: profile, postData: postData }
                }
        } else {
            return {
                props: { postData: postData }
            }
        }
    } else
        return {
            notFound: true
        }
}