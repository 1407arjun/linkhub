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
import TagBar from '../components/posts/tagbar'

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
            <Head title="Profile &middot; LinkHub"/>
            <div className="flex flex-row place-content-start min-h-screen">
                { navStatus && <NavBar navstatus={ navStatus } update={ setNavStatus } current="Profile"/> }
                <div className={ "flex flex-col gap-4 justify-start items-center" + ( navStatus ? " w-5/6 " : " w-full ") + "md:w-5/6 lg:w-7/12 xl:w-3/6 p-4" }>
                    <div className="w-full flex flex-row justify-start items-center gap-4">
                        { !navStatus && <button onClick={ () => {setNavStatus(!navStatus)} } className="inline md:hidden w-10"><img src="/assets/home/menu.svg" className="w-full dark:filter dark:invert" alt="Nav"/></button> }
                        <SearchBar placeholder="What would you like to learn today?" smhidesearch={ false } />
                    </div>
                    <h2 className="w-full font-bold text-2xl md:text-3xl text-left dark:text-white">Profile</h2>
                    <div className={(props.user.tags.length > 0 ? "flex " : "hidden ") + "flex-row flex-wrap gap-2 justify-start items-start w-full"}>
                        { props.user.tags.map((tag, index) => { return <TagBar key={ index } name={ tag }/> }) }
                    </div>
                    <TabLayout tab={ props.tab }/>
                    <TabContent yourPosts={ props.yourPosts } saved={ props.user.saved }/>
                </div>
                <SideBar/>
            </div>
            <Footer username={ props.user.username } signedin={ true }/>
        </div>
    )
}

export async function getServerSideProps(context) {
    const session = await getSession(context)
    const { tab } = context.query
    if (session) {
        const mClient = await client
        const profile = JSON.parse(JSON.stringify(await mClient.db("Client").collection("profiles").findOne({email: session.user.email})))
        //await mClient.close()
        if (!profile)
            return {
                redirect: {
                destination: "/complete/username"
                },
                props: {}
            }
        else {
            if (!tab) {
                const yourPosts = JSON.parse(JSON.stringify(await mClient.db("Client").collection("posts").find({"author.username": profile.username}).sort({date: -1}).toArray()))
                return {
                    props: { user: profile, yourPosts: yourPosts, tab: null }
                } 
            } else {
                if (tab === "upvoted") {
                    const yourPosts = JSON.parse(JSON.stringify(await mClient.db("Client").collection("posts").find({_id: {"$in": profile.upvoted}}).sort({date: -1}).toArray()))
                    return {
                        props: { user: profile, yourPosts: yourPosts, tab: tab }
                    }
                } else {
                    const yourPosts = JSON.parse(JSON.stringify(await mClient.db("Client").collection("posts").find({_id: {"$in": profile.downvoted}}).sort({date: -1}).toArray()))
                    return {
                        props: { user: profile, yourPosts: yourPosts, tab: tab }
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