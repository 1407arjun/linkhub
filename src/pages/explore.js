import Link from 'next/link'
import Head from '../components/uni/head'
import Footer from '../components/uni/footer'
import NavBar from '../components/uni/navbar'
import SearchBar from '../components/uni/searchbar'
import Tag from '../components/home/tag'
import Profile from '../components/profile/profile'
import { useState, useEffect } from 'react'
import { getSession, useSession } from 'next-auth/react'
import client from '../server/loaders/database'

export default function Explore(props) {
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
            <Head title="Explore &middot; LinkHub"/>
            <div className="flex flex-row justify-center items-start min-h-screen">
                { status === "authenticated" && navStatus && <NavBar navstatus={ navStatus } update={ setNavStatus } current="Explore"/> }
                <div className={ "flex flex-col gap-4 justify-start items-center" + ( navStatus ? " w-5/6 " : " w-full ") + "md:w-5/6 lg:w-11/12 xl:w-5/6 p-4" }>
                    <div className="w-full flex flex-row justify-start items-center gap-4">
                        { status === "authenticated" && !navStatus && <button onClick={ () => {setNavStatus(!navStatus)} } className="inline md:hidden w-10"><img src="/assets/home/menu.svg" className="w-full dark:filter dark:invert" alt="Nav"/></button> }
                        <SearchBar placeholder="What would you like to learn today?" smhidesearch={ false } />
                    </div>
                    <h2 className="w-full font-bold text-2xl md:text-3xl text-left dark:text-white">Explore</h2>
                    <div className="w-full">
                        <h3 className="w-full text-left px-2 sm:px-4 text-base md:text-lg xl:text-xl font-bold mb-1 dark:text-white">Trending</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-center items-start w-full px-2 sm:px-4 gap-2 sm:gap-4 mt-1">
                            <Tag name="app-development" follow="8.2K"/>
                            <Tag name="web-development" follow="15K"/>
                            <Tag name="machine-learning" follow="5K"/>
                            <Profile name="Arjun Sivaraman" username="1407arjun"/>
                        </div>
                    </div>
                    <div className="w-full"> 
                        <h4 className="w-full font-normal text-left px-2 sm:px-4 text-base md:text-lg xl:text-xl mb-1 dark:text-white">Found <Link href="/explore"><a><span className="font-semibold underline">10 posts</span></a></Link>, <Link href="/explore"><a><span className="font-semibold underline">5 tags</span></a></Link> and <Link href="/explore"><a><span className="font-semibold underline">2 users</span></a></Link>.</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-center items-start w-full px-2 sm:px-4 gap-2 sm:gap-4 mt-1">
                            <Tag name="app-development" follow="8.2K"/>
                            <Tag name="web-development" follow="15K"/>
                            <Tag name="machine-learning" follow="5K"/>
                            <Profile name="Arjun Sivaraman" username="1407arjun"/>
                        </div>
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
    if (session) {
        const profile = JSON.parse(JSON.stringify(await (await client).db("Client").collection("profiles").findOne({"user.email": session.user.email})))
        if (!profile)
            return {
                redirect: {
                destination: "/complete/username"
                },
                props: {}
            }
        else
            return {
                props: { user: profile }
            }
    } else {
        return {
            props: {}
        }
    }
}