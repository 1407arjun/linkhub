import Head from '../../components/uni/head'
import Footer from '../../components/uni/footer'
import SearchBar from '../../components/uni/searchbar'
import PostMini from '../../components/posts/post-mini'
import NavBar from '../../components/uni/navbar'
import { useState, useEffect } from 'react'
import { getSession, useSession } from 'next-auth/react'
import getProfile from '../../server/services/read/profile'
import client from '../../server/loaders/database'
import { useRouter } from 'next/router'
import TagBar from '../../components/posts/tagbar'

export default function Post(props) {
    const router = useRouter()
    const { data: session, status } = useSession()
    const [navStatus, setNavStatus] = useState(false)
    const [windowSize, setWindowSize] = useState()

    useEffect(() => {
        if (props.profileData.error) {
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

    const { error, data } = props.profileData
    if (error)
        window.alert(JSON.stringify(data))

    return (
        <div className="dark:bg-black">
            <Head title={  data.username + "'s posts on LinkHub" }/>
            <div className="flex flex-row justify-center items-start min-h-screen">
                { status === "authenticated" && navStatus && <NavBar navstatus={ navStatus } update={ setNavStatus } current="Explore"/> }
                <div className={ "flex flex-col gap-6 justify-start items-center" + (status === "authenticated" ? (( navStatus ? " w-5/6 " : " w-full ") + "md:w-5/6 lg:w-11/12 xl:w-5/6 p-4") : " w-full md:w-5/6 lg:w-11/12 xl:w-5/6 p-4 border-l border-r border-gray-300 dark:border-gray-600 min-h-screen") }>
                    <div className="w-full flex flex-row justify-start items-center gap-4">
                        { status === "authenticated" && !navStatus && <button onClick={ () => {setNavStatus(!navStatus)} } className="inline md:hidden w-10"><img src="/assets/home/menu.svg" className="w-full dark:filter dark:invert" alt="Nav"/></button> }
                        <SearchBar placeholder="What would you like to learn today?" smhidesearch={ false }/>
                    </div>
                    <div className="flex flex-row flex-nowrap justify-between items-center w-full px-4 gap-4">
                        <img src={ data.image ? data.image : "/assets/profile/person.svg" } className={ "rounded-full w-12 md:w-16" + (data.image ? "" : " filter invert dark:invert-0") } alt=""/>
                        <div className="flex flex-col justify-start items-center gap-1 w-full">
                            <h2 className="w-full font-bold text-2xl md:text-3xl text-left dark:text-white">{ data.name }</h2>
                            <p className="w-full text-left text-base md:text-lg xl:text-xltext-gray-500 dark:text-gray-300">{ "@ " + data.username }</p>
                        </div>
                    </div>
                    <div className={(data.tags.length > 0 ? "flex " : "hidden ") + "flex-row flex-wrap gap-2 justify-start items-start w-full px-3"}>
                        { data.tags.map((tag, index) => { return <TagBar key={ index } name={ tag }/> }) }
                    </div>
                    <div className="flex flex-col justify-center items-start w-full px-2 sm:px-4 gap-2 sm:gap-4">
                        { props.posts.map((post, index) => {
                            return (
                                <PostMini key={ index } id={ post._id.toString() } name={ post.author.name }
                                    username={ post.author.username }
                                    email = { post.author.email }
                                    image={ post.author.image }
                                    title={ post.title }
                                    body={ post.body }
                                    tags={ post.tags }
                                    date={ post.date }
                                    upvotes={ post.upvotes }
                                    downvotes={ post.downvotes }
                                    flags={ post.flags }
                                    option={ props.user ? (props.user.upvoted.includes(post._id) ? "upvoted" : 
                                        (props.user.downvoted.includes(post._id) ? "downvoted" : 
                                        (props.user.flagged.includes(post._id) ? "flagged" : null))) : null }
                                    saved ={ props.user && props.user.saved.includes(post._id) }
                                    delete ={ false }/>
                            )
                        }) }
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
    const { profile } = context.query

    if (profile !== profile.toLowerCase())
        return {
            redirect: {
                destination: "/profile/" + profile.toLowerCase()
            }     
        }

    const profileData = JSON.parse(JSON.stringify(await getProfile(profile)))
    
    if (profileData.data) {
        const mClient = await client
        const posts = JSON.parse(JSON.stringify(await mClient.db("Client").collection("posts").find({"author.username": profile}).sort({date: 1}).toArray()))
        if (session) {
            const prof = JSON.parse(JSON.stringify(await mClient.db("Client").collection("profiles").findOne({email: session.user.email})))
            
            if (!prof)
                return {
                    redirect: {
                    destination: "/complete/username"
                    },
                    props: {}
                }
            else {
                if (prof.username === profile)
                    return {
                        redirect: {
                        destination: "/profile"
                        },
                        props: {} 
                    }
                else    
                    return {
                        props: { user: prof, profileData: profileData, posts: posts }
                    }
            }     
        } else {
            return {
                props: { profileData: profileData, posts: posts }
            }
        }
    } else
        return {
            notFound: true
        }
}