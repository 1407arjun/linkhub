import Head from '../components/uni/head'
import Footer from '../components/uni/footer'
import NavBar from '../components/uni/navbar'
import SideBar from '../components/profile/sidebar'
import SearchBar from '../components/uni/searchbar'
import { useState, useEffect } from 'react'

export default function Settings() {
    const [navStatus, setNavStatus] = useState(false)
    const [windowSize, setWindowSize] = useState()
    
    useEffect(() => {
        setWindowSize(window.innerWidth)
        window.addEventListener('resize', (ev) => { setWindowSize(ev.path[0].innerWidth) })

        if (windowSize >= 768)
            setNavStatus(true)
        else
            setNavStatus(false)

        return () => { window.removeEventListener('resize', (ev) => { setWindowSize(ev.path[0].innerWidth) }) }    
    }, [windowSize])

    return (
        <div>
            <Head title="Settings &middot; LinkHub"/>
            <div className="flex flex-row place-content-start">
                { navStatus && <NavBar navstatus={ navStatus } update={ setNavStatus } current="Settings"/> }
                <div className={ "flex flex-col gap-4 justify-start items-center" + ( navStatus ? " w-5/6 " : " w-full ") + "md:w-5/6 lg:w-7/12 xl:w-3/6 p-4" }>
                    <div className="w-full flex flex-row justify-start items-center gap-4">
                        { !navStatus && <button onClick={ () => {setNavStatus(!navStatus)} } className="inline md:hidden w-10"><img src="/assets/home/menu.svg" className="w-full" alt="Nav"/></button> }
                        <SearchBar placeholder="What would you like to learn today?"/>
                    </div>
                    <h2 className="w-full font-bold text-2xl md:text-3xl text-left">Profile Data</h2>
                    <form action="/settings" method="POST" className="flex flex-col gap-4 justify-start items-center w-full p-1">
                        <div className="w-full">
                            <label htmlFor="username" className="w-full font-semibold mb-1">Username</label>
                            <input name="username" type="text" placeholder="Username" className="mt-1 w-full p-2 focus:outline-none rounded-md ring-1 ring-gray-300 focus:ring-gray-500"/>
                        </div>
                        <div className="w-full">
                            <label htmlFor="name" className="w-full font-semibold mb-1">Name</label>
                            <input name="name" type="text" placeholder="Name" className="mt-1 w-full p-2 focus:outline-none rounded-md ring-1 ring-gray-300 focus:ring-gray-500"/>
                        </div>
                        <div className="w-full">
                            <label htmlFor="email" className="w-full font-semibold mb-1">Email</label>
                            <input name="email" type="text" placeholder="Email" className="mt-1 w-full p-2 focus:outline-none rounded-md ring-1 ring-gray-300 focus:ring-gray-500"/>
                        </div>
                        <div className="w-full">
                            <label htmlFor="dob" className="w-full font-semibold mb-1">Date of Birth</label>
                            <input name="dob" type="date" placeholder="Date of Birth" className="mt-1 w-full p-2 focus:outline-none rounded-md ring-1 ring-gray-300 focus:ring-gray-500"/>
                        </div>
                        <div className="w-full flex flex-col sm:flex-row gap-4">
                            <button type="submit" className="w-full sm:w-1/3 bg-blue-500 py-2 rounded-md font-bold text-white hover:bg-blue-600 focus:bg-blue-600">Save</button>
                            <button className="w-full sm:w-1/3 bg-white py-2 rounded-md font-bold text-black border border-gray-400 hover:bg-gray-100 focus:bg-gray-100">Edit profile</button>
                            <button type="submit" className="w-full sm:w-1/3 bg-red-500 py-2 rounded-md font-bold text-white hover:bg-red-600 focus:bg-red-600">Delete account</button>
                        </div>
                    </form>
                    <h2 className="w-full font-bold text-2xl md:text-3xl text-left">Security</h2>
                    <form action="/settings" method="POST" className="flex flex-col gap-4 justify-start items-center w-full p-1">
                        <div className="w-full">
                            <label htmlFor="opassword" className="w-full font-semibold mb-1">Old password</label>
                            <input name="opassword" type="password" placeholder="Old password" className="mt-1 w-full p-2 focus:outline-none rounded-md ring-1 ring-gray-300 focus:ring-gray-500"/>
                        </div>
                        <div className="w-full">
                            <label htmlFor="npassword" className="w-full font-semibold mb-1">New password</label>
                            <input name="npassword" type="password" placeholder="New password" className="mt-1 w-full p-2 focus:outline-none rounded-md ring-1 ring-gray-300 focus:ring-gray-500"/>
                        </div>
                        <div className="w-full">
                            <label htmlFor="cpassword" className="w-full font-semibold mb-1">Confirm password</label>
                            <input name="cpassword" type="password" placeholder="Confirm password" className="mt-1 w-full p-2 focus:outline-none rounded-md ring-1 ring-gray-300 focus:ring-gray-500"/>
                        </div>
                        <div className="w-full text-left">
                            <button type="submit" className="inline-block w-full sm:w-1/3 bg-blue-500 py-2 rounded-md font-bold text-white hover:bg-blue-600 focus:bg-blue-600">Change password</button>
                        </div>
                    </form>
                </div>
                <SideBar/>
            </div>
            <Footer signedin={ true }/>
        </div>
    )
}