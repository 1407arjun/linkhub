import Head from '../../components/uni/head'
import Footer from '../../components/uni/footer'
import SearchBar from '../../components/uni/searchbar'
import PostMini from '../../components/posts/post-mini'
import NavBar from '../../components/uni/navbar'
import { useState, useEffect } from 'react'
import { getSession, useSession } from 'next-auth/react'
import getPost from '../../server/services/read/post'
import client from '../../server/loaders/database'
import Error from 'next/error'
import { useRouter } from 'next/router'

export default function Post(props) {
    const router = useRouter()
    const { data: session, status } = useSession()
    const [navStatus, setNavStatus] = useState(false)
    const [windowSize, setWindowSize] = useState()

    useEffect(() => {
        if (props.postData && props.postData.error) {
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

    if (props.postData.data) {
        const { error, data } = props.postData
        if (error)
            window.alert(JSON.stringify(data))

        return (
            <div className="dark:bg-black">
                <Head title="Post on LinkHub &middot; An open source resources network"/>
                <div className="flex flex-row justify-start items-start min-h-screen">
                    { status === "authenticated" && navStatus && <NavBar navstatus={ navStatus } update={ setNavStatus } current="Explore"/> }
                    <div className={ "flex flex-col gap-4 justify-start items-center" + (status === "authenticated" ? (( navStatus ? " w-5/6 " : " w-full ") + "md:w-5/6 lg:w-11/12 xl:w-5/6 p-4") : "w-full md:w-5/6 lg:w-7/12 xl:w-3/6 p-4 border-l border-r border-gray-300 dark:border-gray-600 min-h-screen") }>
                        <div className="w-full flex flex-row justify-start items-center gap-4">
                            { status === "authenticated" && !navStatus && <button onClick={ () => {setNavStatus(!navStatus)} } className="inline md:hidden w-10"><img src="/assets/home/menu.svg" className="w-full dark:filter dark:invert" alt="Nav"/></button> }
                            <SearchBar placeholder="What would you like to learn today?" smhidesearch={ false }/>
                        </div>
                        <div className="flex flex-row flex-nowrap justify-between items-center w-full px-4 gap-4">
                            <img src="/assets/posts/link-45.svg" className="w-8 md:w-12 filter invert dark:invert-0" alt=""/>
                            <div className="flex flex-col justify-start items-center gap-1 w-full">
                                <h2 className="w-full font-bold text-2xl md:text-3xl text-left dark:text-white">{ "Post by " + data.author.user.name.split(" ")[0] }</h2>
                                <p className="w-full text-left text-base md:text-lg xl:text-xltext-gray-500 dark:text-gray-300">{ "At " + data.date }</p>
                            </div>
                        </div>
                        <div className="flex flex-col justify-center items-start w-full px-2 sm:px-4 gap-2 sm:gap-4">
                            <PostMini id={ data._id.toString() } name={ data.author.user.name }
                                username={ data.author.username }
                                email = { data.author.user.email }
                                title={ data.title }
                                body={ data.body }
                                tags={ data.tags }
                                upvotes={ data.upvotes }
                                downvotes={ data.downvotes }
                                flags={ data.flags }
                                saved ={ false }
                                delete ={ session.user.email === data.author.user.email }/>
                        </div>
                        <p className="text-sm md:text-base italic dark:text-white">-- You have reached the end --</p>
                    </div>
                </div>
                { status === "authenticated" ? <Footer username={ props.user.username } signedin={ true }/> : <Footer signedin={ false }/>}
            </div>
        )
    } else
        return <Error statusCode={ 404 }/>
}

export async function getServerSideProps(context) {
    const session = await getSession(context)
    const { post } = context.query
    const postData = JSON.parse(JSON.stringify(await getPost(post)))
    
    if (session) {
        const mClient = await client
        const profile = JSON.parse(JSON.stringify(await mClient.db("Client").collection("profiles").findOne({"user.email": session.user.email})))
        await mClient.close()
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
}