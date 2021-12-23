import Head from '../../components/uni/head'
import Footer from '../../components/uni/footer'
import SearchBar from '../../components/uni/searchbar'
import PostMini from '../../components/posts/post-mini'
import NavBar from '../../components/uni/navbar'
import { useState, useEffect } from 'react'
import { getSession, useSession } from 'next-auth/react'
import getTag from '../../server/services/read/tag'
import client from '../../server/loaders/database'
import { useRouter } from 'next/router'
import axios from 'axios'

export default function Post(props) {
    const router = useRouter()
    const { data: session, status } = useSession()
    const [navStatus, setNavStatus] = useState(false)
    const [windowSize, setWindowSize] = useState()

    useEffect(() => {
        if (props.tagData.error) {
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

    const { error, data } = props.tagData
    if (error)
        window.alert(JSON.stringify(data))

    const [follow, setFollow] = useState(props.user && props.user.tags.includes(data.name))

    async function addToTags(newFollow) {
        setFollow(!newFollow)
        try {
            const r = await axios.post("/api/tag/update", { tag: data.name, remove: false })
            if (r.status !== 200)
                setFollow(newFollow)
        } catch (e) {
            console.log(e)
        }
    }

    async function removeFromTags(newFollow) {
        setFollow(!newFollow)
        try {
            const r = await axios.post("/api/tag/update", { tag: data.name, remove: true })
            if (r.status !== 200)
                setFollow(newFollow)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className="dark:bg-black">
            <Head title={  data.name + " on LinkHub" }/>
            <div className="flex flex-row justify-center items-start min-h-screen">
                { status === "authenticated" && navStatus && <NavBar navstatus={ navStatus } update={ setNavStatus } current="Explore"/> }
                <div className={ "flex flex-col gap-6 justify-start items-center" + (status === "authenticated" ? (( navStatus ? " w-5/6 " : " w-full ") + "md:w-5/6 lg:w-11/12 xl:w-5/6 p-4") : " w-full md:w-5/6 lg:w-11/12 xl:w-5/6 p-4 border-l border-r border-gray-300 dark:border-gray-600 min-h-screen") }>
                    <div className="w-full flex flex-row justify-start items-center gap-4">
                        { status === "authenticated" && !navStatus && <button onClick={ () => {setNavStatus(!navStatus)} } className="inline md:hidden w-10"><img src="/assets/home/menu.svg" className="w-full dark:filter dark:invert" alt="Nav"/></button> }
                        <SearchBar placeholder="What would you like to learn today?" smhidesearch={ false }/>
                    </div>
                    <div className="flex flex-row flex-nowrap justify-between items-center w-full px-4 gap-4">
                        <img src="/assets/home/tag.svg" className="w-12 md:w-16 filter invert dark:invert-0" alt=""/>
                        <div className="flex flex-col justify-start items-center gap-1 w-full">
                            <h2 className="w-full font-bold text-2xl md:text-3xl text-left dark:text-white">{ data.name }</h2>
                            <p className="w-full text-left text-base md:text-lg xl:text-xltext-gray-500 dark:text-gray-300">{ props.posts.length + " posts" }</p>
                        </div>
                        { status === "authenticated" && !follow && <button onClick={ () => addToTags(follow) } className="flex-none self-center justify-self-end bg-white dark:bg-black rounded-full">
                            <img src="/assets/home/plus-sq.svg" className="w-6 md:w-10" alt="Add"/>
                        </button> }
                        { status === "authenticated" && follow && <button onClick={ () => removeFromTags(follow) } className="flex-none self-center justify-self-end bg-white dark:bg-black rounded-full">
                            <img src="/assets/home/delete-sq.svg" className="w-6 md:w-10" alt="Remove"/>
                        </button> }
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
                                    delete ={ props.user && props.user.email === post.author.email }/>
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
    const { tag } = context.query

    if (tag !== tag.toLowerCase())
        return {
            redirect: {
                destination: "/tag/" + tag.toLowerCase()
            }     
        }

    const tagData = JSON.parse(JSON.stringify(await getTag(tag)))
    
    if (tagData.data) {
        const mClient = await client
        const posts = JSON.parse(JSON.stringify(await mClient.db("Client").collection("posts").find({tags: tag}).sort({upvotes: -1}).toArray()))
        if (session) {
            const prof = JSON.parse(JSON.stringify(await mClient.db("Client").collection("profiles").findOne({email: session.user.email})))
            
            if (!prof)
                return {
                    redirect: {
                    destination: "/complete/username"
                    },
                    props: {}
                }
            else  
                return {
                    props: { user: prof, tagData: tagData, posts: posts }
                }   
        } else {
            return {
                props: { tagData: tagData, posts: posts }
            }
        }
    } else
        return {
            notFound: true
        }
}