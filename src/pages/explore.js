import Link from 'next/link'
import Head from '../components/uni/head'
import Footer from '../components/uni/footer'
import NavBar from '../components/uni/navbar'
import SearchBar from '../components/uni/searchbar'
import Tag from '../components/home/tag'
import Recent from '../components/posts/recent'
import Profile from '../components/profile/profile'
import { useState, useEffect } from 'react'
import { getSession, useSession } from 'next-auth/react'
import client from '../server/loaders/database'
import search from '../server/services/search'

export default function Explore(props) {
    const { data: session, status } = useSession()
    const [navStatus, setNavStatus] = useState(false)
    const [windowSize, setWindowSize] = useState()
    const [trendTags, setTrendTags] = useState(props.trendTags)
    
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
            <Head title="Explore &middot; LinkHub" desc="Explore tags, posts and profiles on LinkHub"/>
            <div className="flex flex-row justify-center items-start min-h-screen">
                { status === "authenticated" && navStatus && <NavBar navstatus={ navStatus } update={ setNavStatus } current="Explore"/> }
                <div className={ "flex flex-col gap-4 justify-start items-center" + (status === "authenticated" ? (( navStatus ? " w-5/6 border-l border-gray-300 dark:border-gray-600 " : " w-full ") + "md:w-5/6 lg:w-11/12 xl:w-5/6 p-4") : " w-full md:w-5/6 lg:w-11/12 xl:w-5/6 p-4 border-l border-r border-gray-300 dark:border-gray-600 min-h-screen") }>
                    <div className="w-full flex flex-row justify-start items-center gap-4">
                        { status === "authenticated" && !navStatus && <button onClick={ () => {setNavStatus(!navStatus)} } className="inline md:hidden w-10"><img src="/assets/home/menu.svg" className="w-full dark:invert" alt="Nav"/></button> }
                        <SearchBar text={ props.query ? props.query : "" } placeholder="What would you like to learn today?" smhidesearch={ false } />
                    </div>
                    <h2 className="w-full font-bold text-2xl md:text-3xl text-left dark:text-white">Explore</h2>
                    <div className="h-screen overflow-y-auto w-full">
                        { !props.results && <div className="w-full">
                            <h3 className="w-full text-left px-2 sm:px-4 text-base md:text-lg xl:text-xl font-bold mb-1 dark:text-white">Trending</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-center items-start w-full px-2 sm:px-4 gap-2 sm:gap-4 mt-1">
                                { trendTags.map((tag, index) => {
                                    return <Tag key={ tag._id } name={ tag._id } post={ tag.count } follow={ props.user && props.user.tags.includes(tag._id) }/>
                                }) }
                            </div>
                        </div> }
                        { props.results && <div className="w-full"> 
                            <h3 className="w-full font-normal text-left px-2 sm:px-4 text-base md:text-lg xl:text-xl mb-1 dark:text-white">Found <Link href="#tags"><a><span className="font-semibold underline">{props.results.tags.length + " tags"}</span></a></Link>, <Link href="#posts"><a><span className="font-semibold underline">{props.results.posts.length + " posts"}</span></a></Link> and <Link href="#users"><a><span className="font-semibold underline">{props.results.profiles.length + " users"}</span></a></Link>.</h3>
                            <br/>
                            <h4 className="w-full font-bold text-left px-2 sm:px-4 text-base md:text-lg xl:text-xl mb-1 dark:text-white" id="tags">Tags</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-center items-start w-full px-2 sm:px-4 gap-2 sm:gap-4 mt-1">
                                { props.results.tags.map((tag, index) => {
                                    return <Tag key={ tag._id } name={ tag._id } post={ tag.count } follow={ props.user && props.user.tags.includes(tag._id) }/>
                                }) }
                            </div>
                            <br/>
                            <h4 className="w-full font-bold text-left px-2 sm:px-4 text-base md:text-lg xl:text-xl mb-1 dark:text-white" id="posts">Posts</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-center items-start w-full px-2 sm:px-4 gap-2 sm:gap-4 mt-1">
                                { props.results.posts.map((post, index) => {
                                    return <Recent key={ post._id.toString() } title={ post.title } desc={ "@" + post.author.username } id={ post._id.toString() } save={ props.user && props.user.saved.includes(post._id) }/>
                                }) }
                            </div>
                            <br/>
                            <h4 className="w-full font-bold text-left px-2 sm:px-4 text-base md:text-lg xl:text-xl mb-1 dark:text-white" id="users">Users</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-center items-start w-full px-2 sm:px-4 gap-2 sm:gap-4 mt-1">
                                { props.results.profiles.map((profile, index) => {
                                    return <Profile key={ profile.username } name={ profile.name } username={ profile.username } image={ profile.image }/>
                                }) }
                            </div>
                        </div> }
                        <p className="text-sm md:text-base italic dark:text-white text-center mt-4">-- You have reached the end --</p>
                    </div>
                </div>
            </div>
            { status === "authenticated" ? <Footer username={ props.user.username } signedin={ true }/> : <Footer signedin={ false }/>}
        </div>
    )
}

export async function getServerSideProps(context) {
    const session = await getSession(context)
    const { query } = context.query

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
            if (!query) {
                const trendTags = JSON.parse(JSON.stringify(await mClient.db("Client").collection("posts").aggregate([{$match: {tags: {$nin: profile.tags}}}, {$unwind: "$tags"},  {$sortByCount: "$tags"}]).limit(10).toArray()))
                return {
                    props: { user: profile, trendTags: trendTags }
                }
            } else {
                const results = JSON.parse(JSON.stringify(await search(query)))
                if (results.error) {
                    const trendTags = JSON.parse(JSON.stringify(await mClient.db("Client").collection("posts").aggregate([{$match: {tags: {$nin: profile.tags}}}, {$unwind: "$tags"},  {$sortByCount: "$tags"}]).limit(10).toArray()))
                    return {
                        props: { user: profile, trendTags: trendTags }
                    }
                }
                return {
                    props: { user: profile, query: query, results: results.data }
                }
            }
        }     
    } else {
        const mClient = await client
        if (!query) {
            const trendTags = JSON.parse(JSON.stringify(await mClient.db("Client").collection("posts").aggregate([{$unwind: "$tags"},  {$sortByCount: "$tags"}]).limit(10).toArray()))
            return {
                props: { trendTags: trendTags }
            }
        } else {
            const results = JSON.parse(JSON.stringify(await search(query)))
            if (results.error) {
                const trendTags = JSON.parse(JSON.stringify(await mClient.db("Client").collection("posts").aggregate([{$unwind: "$tags"},  {$sortByCount: "$tags"}]).limit(10).toArray()))
                return {
                    props: { trendTags: trendTags }
                }
            }
            return {
                props: { query: query, results: results.data }
            }
        }
    }
}