import Head from '../components/uni/head'
import Footer from '../components/uni/footer'
import NavBar from '../components/uni/navbar'
import SideBar from '../components/profile/sidebar'
import SearchBar from '../components/uni/searchbar'
import TabLayout from '../components/profile/tablayout'
import TabContent from '../components/profile/tabcontent'
import { useState, useEffect } from 'react'
import { getSession } from 'next-auth/react'
import client from '../server/loaders/database'
import { ObjectId } from 'mongodb'

export default function Profile(props) {
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
            <Head title="Profile &middot; LinkHub" desc="View your LinkHub profile - posts, upvotes, downvotes and tags"/>
            <div className="flex flex-row place-content-start min-h-screen">
                { navStatus && <NavBar navstatus={ navStatus } update={ setNavStatus } current="Profile"/> }
                <div className={ "flex flex-col gap-4 justify-start items-center" + ( navStatus ? " w-5/6 border-l border-gray-300 dark:border-gray-600 " : " w-full ") + "md:w-5/6 lg:w-7/12 xl:w-3/6 py-4" }>
                    <div className="w-full flex flex-row justify-start items-center gap-4 px-4">
                        { !navStatus && <button onClick={ () => {setNavStatus(!navStatus)} } className="inline md:hidden w-10"><img src="/assets/home/menu.svg" className="w-full dark:invert" alt="Nav"/></button> }
                        <SearchBar placeholder="What would you like to learn today?" smhidesearch={ false } />
                    </div>
                    <h2 className="w-full font-bold text-2xl md:text-3xl text-left dark:text-white px-4">Profile</h2>
                    <TabLayout tab={ props.tab } moderator={ props.user.roles.includes("moderator") }/>
                    <TabContent tab={ props.tab } posts={ props.posts } profile={ props.user } tags={ props.posts ? null : props.user.tags }/>
                </div>
                <SideBar/>
            </div>
            <Footer username={ props.user.username } signedin={ true }/>
        </div>
    )
}

export async function getServerSideProps(context) {
    //const session = await getSession(context)
    const session = { user: { email: "arjun140702@gmail.com" }}
    const { tab } = context.query
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
            if (!tab) {
                const posts = JSON.parse(JSON.stringify(await mClient.db("Client").collection("posts").find({"author.username": profile.username}).sort({date: -1}).toArray()))
                return {
                    props: { user: profile, posts: posts, tab: null }
                } 
            } else {
                if (tab === "upvoted") {
                    const oidArray = profile.upvoted.map(id => { return new ObjectId(id) })
                    const posts = JSON.parse(JSON.stringify(await mClient.db("Client").collection("posts").find({_id: {"$in": oidArray}}).sort({date: -1}).toArray()))
                    return {
                        props: { user: profile, posts: posts, tab: tab }
                    }
                } else if (tab === "downvoted") {
                    const oidArray = profile.downvoted.map(id => { return new ObjectId(id) })
                    const posts = JSON.parse(JSON.stringify(await mClient.db("Client").collection("posts").find({_id: {"$in": oidArray}}).sort({date: -1}).toArray()))
                    return {
                        props: { user: profile, posts: posts, tab: tab }
                    }
                } else if (profile.roles.includes("moderator") && tab === "moderation") {
                    const posts = JSON.parse(JSON.stringify(await mClient.db("Client").collection("posts").find({tags: {"$in": profile.tags}, flags: {"$gte": {"$subtract": ["$upvotes", "$downvotes"]}}}).sort({flags: -1, date: -1}).toArray()))
                    return {
                        props: { user: profile, posts: posts, tab: tab }
                    }    
                } else if (tab === "tags") {
                    return {
                        props: { user: profile, tab: tab }
                    }
                } else {
                    return {
                        notFound: true
                    }
                }
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