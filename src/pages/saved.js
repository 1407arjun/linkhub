import Head from '../components/uni/head'
import Footer from '../components/uni/footer'
import NavBar from '../components/uni/navbar'
import SideBar from '../components/posts/sidebar'
import SearchBar from '../components/uni/searchbar'
import PostMini from '../components/posts/post-mini'
import { useState, useEffect } from 'react'
import { useSession, getSession } from 'next-auth/react'
import client from '../server/loaders/database'
import { ObjectId } from 'mongodb'

export default function Saved(props) {
    const { data: session, status } = useSession()
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
            <Head title="Saved Posts &middot; LinkHub" desc="View your saved posts on LinkHub"/>
            <div className="flex flex-row place-content-start min-h-screen">
                { navStatus && <NavBar navstatus={ navStatus } update={ setNavStatus } current="Saved"/> }
                <div className={ "flex flex-col gap-4 justify-start items-center" + ( navStatus ? " w-5/6 " : " w-full ") + "md:w-5/6 lg:w-7/12 xl:w-3/6 p-4" }>
                    <div className="w-full flex flex-row justify-start items-center gap-4">
                        { !navStatus && <button onClick={ () => {setNavStatus(!navStatus)} } className="inline md:hidden w-10"><img src="/assets/home/menu.svg" className="w-full dark:filter dark:invert" alt="Nav"/></button> }
                        <SearchBar placeholder="Search saved posts" smhidesearch={ false } />
                    </div>
                    <h2 className="w-full font-bold text-2xl md:text-3xl text-left dark:text-white">Saved Posts</h2>
                    <div className="flex flex-col justify-center items-start w-full px-2 sm:px-4 gap-2 sm:gap-4">
                        { props.posts.map((data, index) => { return (
                            <PostMini key={ index } id={ data._id.toString() } name={ data.author.name }
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
                                option={ props.user.upvoted.includes(data._id) ? "upvoted" : 
                                    (props.user.downvoted.includes(data._id) ? "downvoted" : 
                                    (props.user.flagged.includes(data._id) ? "flagged" : null)) }
                                saved ={ true }
                                delete ={ data.author.email === props.user.email }/>
                        ) }) }
                    </div>
                    <p className="text-sm md:text-base italic dark:text-white">-- You have reached the end --</p>
                </div>
                <SideBar saved={ props.posts } upvoted={ props.upvoted }/>
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
            const oidArray = profile.saved.map(id => { return new ObjectId(id) })
            const saved = JSON.parse(JSON.stringify(await mClient.db("Client").collection("posts").find({_id: {"$in": oidArray}}).sort({date: -1}).toArray()))
            
            const count = 0
            let upArray = []
            for (var i = profile.upvoted.length - 1; i >= 0; i--) {
                if (count >= 5)
                    break
                else {
                    if (!profile.saved.includes(profile.upvoted[i]))
                        upArray.push(profile.upvoted[i])
                }
            }

            const oidUpArray = upArray.map(id => { return new ObjectId(id) })
            const upvoted = JSON.parse(JSON.stringify(await mClient.db("Client").collection("posts").find({_id: {"$in": oidUpArray}}).limit(5).toArray()))
            upvoted.reverse()
            return {
                props: { user: profile, posts: saved, upvoted: upvoted }
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