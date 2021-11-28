import Head from '../components/uni/head'
import Footer from '../components/uni/footer'
import NavBar from '../components/uni/navbar'
import SideBar from '../components/posts/sidebar'
import SearchBar from '../components/uni/searchbar'
import PostMini from '../components/posts/post-mini'
import { useState, useEffect } from 'react'
import { getSession } from 'next-auth/react'
import client from '../server/loaders/database'

export default function Saved(props) {
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
            <Head title="Saved Posts &middot; LinkHub"/>
            <div className="flex flex-row place-content-start min-h-screen">
                { navStatus && <NavBar navstatus={ navStatus } update={ setNavStatus } current="Saved"/> }
                <div className={ "flex flex-col gap-4 justify-start items-center" + ( navStatus ? " w-5/6 " : " w-full ") + "md:w-5/6 lg:w-7/12 xl:w-3/6 p-4" }>
                    <div className="w-full flex flex-row justify-start items-center gap-4">
                        { !navStatus && <button onClick={ () => {setNavStatus(!navStatus)} } className="inline md:hidden w-10"><img src="/assets/home/menu.svg" className="w-full dark:filter dark:invert" alt="Nav"/></button> }
                        <SearchBar placeholder="Search saved posts" smhidesearch={ false } />
                    </div>
                    <h2 className="w-full font-bold text-2xl md:text-3xl text-left dark:text-white">Saved Posts</h2>
                    <div className="flex flex-col justify-center items-start w-full px-2 sm:px-4 gap-2 sm:gap-4">
                        {/* Posts go here*/ }
                    </div>
                    <p className="text-sm md:text-base italic dark:text-white">-- You have reached the end --</p>
                </div>
                <SideBar/>
            </div>
            <Footer username={ props.user.username } signedin={ true }/>
        </div>
    )
}

export async function getServerSideProps(context) {
    const session = await getSession(context)
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
                props: { user: profile }
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