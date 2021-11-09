import Head from '../components/uni/head'
import Footer from '../components/uni/footer'
import NavBar from '../components/uni/navbar'
import SideBar from '../components/profile/sidebar'
import SearchBar from '../components/uni/searchbar'
import TabLayout from '../components/profile/tablayout'
import TabContent from '../components/profile/tabcontent'
import { useState, useEffect } from 'react'

export default function Profile() {
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
                        <SearchBar user="Arjun Sivaraman" placeholder="What would you like to learn today?"/>
                    </div>
                    <h2 className="w-full font-bold text-2xl md:text-3xl text-left dark:text-white">Profile</h2>
                    <TabLayout/>
                    <TabContent/>
                </div>
                <SideBar/>
            </div>
            <Footer signedin={ true }/>
        </div>
    )
}