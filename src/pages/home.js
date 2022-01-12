import Head from '../components/uni/head'
import Footer from '../components/uni/footer'
import NavBar from '../components/uni/navbar'
import SideBar from '../components/home/sidebar'
import SearchBar from '../components/uni/searchbar'
import PostMini from '../components/posts/post-mini'
import { useState, useEffect } from 'react'
import { getSession } from 'next-auth/react'
import client from '../server/loaders/database'
import nprogress from 'nprogress'
import axios from 'axios'

export default function Home(props) {
    const [navStatus, setNavStatus] = useState(false)
    const [windowSize, setWindowSize] = useState()
    const [posts, setPosts] = useState([])
    const [olderPosts, setOlderPosts] = useState([])
    const [saved, setSaved] = useState([])
    const [tags, setTags] = useState([])
    
    useEffect(() => {
        setWindowSize(window.innerWidth)
        window.addEventListener('resize', (ev) => { setWindowSize(ev.path[0].innerWidth) })

        if (windowSize >= 768)
            setNavStatus(true)
        else
            setNavStatus(false)   
    }, [windowSize])

    async function initPosts(username, tags) {
        nprogress.start()
        try {
            const res = await axios.post("/api/init/home/posts", { username: username, tags: tags })
            nprogress.done()
            if (!res.data.error) {
                setPosts(res.data.data.posts)
                setOlderPosts(res.data.data.olderPosts)
            }    
        } catch (e) {
            console.log(e)
            nprogress.done()
        }
    }

    async function initSaved(saved) {
        nprogress.start()
        try {
            const res = await axios.post("/api/init/home/saved", { saved: saved })
            nprogress.done()
            if (!res.data.error) {
                setSaved(res.data.data.saved)
            }    
        } catch (e) {
            console.log(e)
            nprogress.done()
        }
    }

    async function initTags(tags) {
        nprogress.start()
        try {
            const res = await axios.post("/api/init/home/tags", { tags: tags })
            nprogress.done()
            if (!res.data.error) {
                setTags(res.data.data.tags)
            }    
        } catch (e) {
            console.log(e)
            nprogress.done()
        }
    }

    useEffect(() => {
        initPosts(props.user.username, props.user.tags)
        initSaved(props.user.saved)
        initTags(props.user.tags)
    }, [props.user])

    return (
        <div className="dark:bg-black">
            <Head title="Home &middot; LinkHub" desc="View what's trending on your timeline"/>
            <div className="flex flex-row place-content-start min-h-screen">
                { navStatus && <NavBar navstatus={ navStatus } update={ setNavStatus } current="Home"/> }
                <div className={ "flex flex-col gap-4 justify-start items-center" + ( navStatus ? " w-5/6 border-l border-gray-300 dark:border-gray-600 " : " w-full ") + "md:w-5/6 lg:w-7/12 xl:w-3/6 py-4" }>
                    <div className="w-full flex flex-row justify-start items-center gap-4 px-4">
                        { !navStatus && <button onClick={ () => {setNavStatus(!navStatus)} } className="inline md:hidden w-10"><img src="/assets/home/menu.svg" className="w-full dark:invert" alt="Nav"/></button> }
                        <SearchBar placeholder="What would you like to learn today?" smhidesearch={ false } />
                    </div>
                    <div className="h-screen overflow-y-auto w-full">
                        { posts.length > 0 && <div className="flex flex-col justify-center items-start w-full px-2 sm:px-4 gap-2 sm:gap-4">
                            { posts.map((post, index) => {
                                return (
                                    <PostMini key={ post._id.toString() } id={ post._id.toString() } name={ post.author.name }
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
                                        delete ={ props.user && props.user.email === post.author.email }/>
                                )
                            }) }
                        </div> } 
                        { olderPosts.length > 0 && <div className="flex flex-col justify-center items-start w-full px-2 sm:px-4 gap-2 sm:gap-4 mt-4">
                            <h3 className="w-full text-left text-lg md:text-xl xl:text-2xl font-bold dark:text-white">Older posts</h3>
                            { olderPosts.map((post, index) => {
                                return (
                                    <PostMini key={ post._id.toString() } id={ post._id.toString() } name={ post.author.name }
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
                                        delete ={ props.user && props.user.email === post.author.email }/>
                                )
                            }) }
                        </div> }
                        <p className="text-sm md:text-base italic dark:text-white text-center mt-4">-- You have reached the end --</p>
                    </div>
                </div>
                <SideBar saved={ saved } tags={ tags }/>
            </div>
            <Footer username={ props.user.username } signedin={ true }/>
        </div>
    )
}

export async function getServerSideProps(context) {
    /*const session = await getSession(context)
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
        else {
            return { props: { user: profile } }   
        }
    } else {
        return {
            redirect: {
            destination: "/login"
            },
            props: {}
        }
    }*/

    const mClient = await client
    const profile = JSON.parse(JSON.stringify(await mClient.db("Client").collection("profiles").findOne({email: "arjun140702@gmail.com"})))
    if (!profile)
        return {
            redirect: {
            destination: "/complete/username"
            },
            props: {}
        }
    else
        return { props: { user: profile } }   
}