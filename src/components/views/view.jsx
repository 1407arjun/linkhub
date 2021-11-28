import Head from '../uni/head'
import Footer from '../uni/footer'
import SearchBar from '../uni/searchbar'
import PostMini from '../posts/post-mini'
import NavBar from '../uni/navbar'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'

export default function View(props) {
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
            <Head title={ props.head + " \u00b7 An open source resources network" }/>
            <div className="flex flex-row justify-center items-start min-h-screen">
                { status === "authenticated" && navStatus && <NavBar navstatus={ navStatus } update={ setNavStatus } current="Explore"/> }
                <div className="flex flex-col gap-4 justify-start items-center w-full md:w-5/6 lg:w-7/12 xl:w-3/6 p-4 border-l border-r border-gray-300 dark:border-gray-600 min-h-screen">
                    <div className="w-full flex flex-row justify-start items-center gap-4">
                        { status === "authenticated" && !navStatus && <button onClick={ () => {setNavStatus(!navStatus)} } className="inline md:hidden w-10"><img src="/assets/home/menu.svg" className="w-full dark:filter dark:invert" alt="Nav"/></button> }
                        <SearchBar placeholder="What would you like to learn today?" smhidesearch={ false }/>
                    </div>
                    <div className="flex flex-row flex-nowrap justify-between items-center w-full px-4 gap-4">
                        <img src={ props.img } className="w-8 md:w-12 filter invert dark:invert-0" alt=""/>
                        <div className="flex flex-col justify-start items-center gap-1 w-full">
                            <h2 className="w-full font-bold text-2xl md:text-3xl text-left dark:text-white">{ props.name }</h2>
                            <h3 className="w-full text-left text-base md:text-lg xl:text-xltext-gray-500 dark:text-gray-300">{ props.desc }</h3>
                        </div>
                        { props.add && <button className="flex-none self-center justify-self-end bg-white dark:bg-black rounded-full">
                            <img src="/assets/home/plus-sq.svg" className="w-6 md:w-10" alt="Add"/>
                        </button> }
                    </div>
                    <div className="flex flex-col justify-center items-start w-full px-2 sm:px-4 gap-2 sm:gap-4">
                        <PostMini name="Arjun Sivaraman"
                            username="1407arjun"
                            title="Post Title"
                            body="Post Body"
                            upvotes="800"
                            downvotes="30"
                            flags="2"/>
                        <PostMini name="Thor"
                            username="thor"
                            title="Post Title"
                            body="Post Body"
                            upvotes="1.2K"
                            downvotes="0"
                            flags="50"/>
                    </div>
                    <p className="text-sm md:text-base italic dark:text-white">-- You have reached the end --</p>
                </div>
            </div>
            { status === "authenticated" ? <Footer username={ props.user.username } signedin={ true }/> : <Footer signedin={ false }/>}
        </div>
    )
}