import Head from '../components/uni/head'
import Footer from '../components/uni/footer'
import NavBar from '../components/uni/navbar'
import SideBar from '../components/home/sidebar'
import SearchBar from '../components/uni/searchbar'
import PostMini from '../components/posts/post-mini'
import { useState, useEffect } from 'react'
import { getSession } from 'next-auth/react'
import client from '../server/loaders/database'
import { ObjectId } from 'mongodb'

export default function Home(props) {
    const [navStatus, setNavStatus] = useState(false)
    const [windowSize, setWindowSize] = useState()
    
    useEffect(() => {
        setWindowSize(window.innerWidth)
        window.addEventListener('resize', (ev) => { setWindowSize(ev.path[0].innerWidth) })

        if (windowSize >= 768)
            setNavStatus(true)
        else
            setNavStatus(false)   
    }, [windowSize])

    return (
        <div className="dark:bg-black">
            <Head title="Home &middot; LinkHub"/>
            <div className="flex flex-row place-content-start min-h-screen">
                { navStatus && <NavBar navstatus={ navStatus } update={ setNavStatus } current="Home"/> }
                <div className={ "flex flex-col gap-4 justify-start items-center" + ( navStatus ? " w-5/6 " : " w-full ") + "md:w-5/6 lg:w-7/12 xl:w-3/6 p-4" }>
                    <div className="w-full flex flex-row justify-start items-center gap-4">
                        { !navStatus && <button onClick={ () => {setNavStatus(!navStatus)} } className="inline md:hidden w-10"><img src="/assets/home/menu.svg" className="w-full dark:filter dark:invert" alt="Nav"/></button> }
                        <SearchBar placeholder="What would you like to learn today?" smhidesearch={ false } />
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
                <SideBar saved={ props.saved } tags={ props.tags }/>
            </div>
            <Footer username={ props.user.username } signedin={ true }/>
        </div>
    )
}

export async function getServerSideProps(context) {
    const session = await getSession(context)
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
            const posts = JSON.parse(JSON.stringify(await mClient.db("Client").collection("posts")
                                .aggregate([{"$match": {"author.username": {"$ne": profile.username}, 
                                        tags: {"$in": profile.tags}}},
                                    {"$project": {title : 1, body : 1, date: 1, upvotes: 1, downvotes: 1, flags: 1, author: 1, tags: 1, ratio: {"$cond": {"if": {downvotes: 0}, "then": "$upvotes", "else": {"$divide": ["$upvotes", "$downvotes"]}}}}},
                                    {"$sort": {date: 1, ratio: -1}}
                                    ]).limit(25).toArray()))

            const oidArray = profile.saved.map(id => { return new ObjectId(id) })
            const saved = JSON.parse(JSON.stringify(await mClient.db("Client").collection("posts").find({_id: {"$in": oidArray}}).limit(3).toArray()))
            const tags = JSON.parse(JSON.stringify(await mClient.db("Client").collection("posts").aggregate([{$match: {tags: {$nin: profile.tags}}}, {$unwind: "$tags"},  {$sortByCount: "$tags"}]).limit(5).toArray()))
            return {
                props: { user: profile, posts: posts, saved: saved, tags: tags }
            }
        }
    } else {
        return {
            redirect: {
            destination: "/login"
            },
            props: {}
        }
    }
}