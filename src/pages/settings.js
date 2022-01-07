import Head from '../components/uni/head'
import Footer from '../components/uni/footer'
import NavBar from '../components/uni/navbar'
import SideBar from '../components/profile/sidebar'
import SearchBar from '../components/uni/searchbar'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { getSession } from 'next-auth/react'
import client from '../server/loaders/database'
import { signOut } from 'next-auth/react'
import axios from 'axios'
import nprogress from 'nprogress'

export default function Settings(props) {
    const [navStatus, setNavStatus] = useState(false)
    const [windowSize, setWindowSize] = useState()
    const [disableProfile, setDisableProfile] = useState(true)
    const [username, setUsername] = useState(props.user.username)
    const [name, setName] = useState(props.user.name)
    const router = useRouter()
    
    useEffect(() => {
        setWindowSize(window.innerWidth)
        window.addEventListener('resize', (ev) => { setWindowSize(ev.path[0].innerWidth) })

        if (windowSize >= 768)
            setNavStatus(true)
        else
            setNavStatus(false)
    }, [windowSize])

    function handleUsernameChange(ev) {
        let re = new RegExp("^[a-z0-9_]*$")
        let val = ev.target.value.toLowerCase()

        if (val.length > 20) {
            setUsername(val.slice(0, 20))
        } else if (re.test(val) && val.length <= 20)
            setUsername(val)
    }

    function handleNameChange(ev) {
        let re = new RegExp("^[a-zA-Z0-9_\\- ]*$")
        let val = ev.target.value

        if (val.length > 50) {
            setName(val.slice(0, 50))
        } else if (re.test(val) && val.length <= 50)
            setName(val)
    }

    async function check(ev) {
        ev.preventDefault()

        if (username === props.user.username)
            router.reload()
        else {
            nprogress.start()
            try {
                const res = await axios.get("/api/profile/create?username=" + username)

                if (res.status === 200) {
                    if (res.data.exists) {
                        nprogress.done()
                        alert("Username already exists.")
                    } else {
                        const r = await axios.post("/api/profile/update", { username: props.user.username, newUsername: username, email: props.user.email })
                        nprogress.done()

                        if (r.status === 200)
                            router.reload()
                        else
                            router.reload()
                    }
                } else {
                    nprogress.done()
                    router.reload()
                }     
            } catch (e) {
                console.log(e)
                nprogress.done()
                router.reload()
            }
        }
    }

    async function deleteProfile(id, username, email) {
        const submit = confirm("Are you sure you want to delete your account? This action is irreversible.")
        if (submit) {
            nprogress.start()
            try {
                const res = await axios.post("/api/profile/delete", { _id: id, username: username, email: email })
                nprogress.done()
                if (res.status === 200)
                    signOut()
                else
                    router.reload()    
            } catch (e) {
                console.log(e)
                nprogress.done()
                router.reload()
            }
        }     
    }

    return (
        <div className="dark:bg-black">
            <Head title="Settings &middot; LinkHub" desc="Manage your account on LinkHub"/>
            <div className="flex flex-row place-content-start min-h-screen">
                { navStatus && <NavBar navstatus={ navStatus } update={ setNavStatus } current="Settings"/> }
                <div className={ "flex flex-col gap-4 justify-start items-center" + ( navStatus ? " w-5/6 border-l border-gray-300 dark:border-gray-600 " : " w-full ") + "md:w-5/6 lg:w-7/12 xl:w-3/6 p-4" }>
                    <div className="w-full flex flex-row justify-start items-center gap-4">
                        { !navStatus && <button onClick={ () => {setNavStatus(!navStatus)} } className="inline md:hidden w-10"><img src="/assets/home/menu.svg" className="w-full dark:invert" alt="Nav"/></button> }
                        <SearchBar placeholder="What would you like to learn today?" smhidesearch={ false } />
                    </div>
                    <h2 className="w-full font-bold text-2xl md:text-3xl text-left dark:text-white">Profile Data</h2>
                    <form onSubmit={ check } className="flex flex-col gap-4 justify-start items-center w-full p-1">
                        <div className="w-full">
                            <label htmlFor="username" className="w-full font-semibold mb-1 dark:text-white">Username</label>
                            <input onChange={ handleUsernameChange } name="username" type="text" placeholder="Username" className="mt-1 w-full p-2 focus:outline-none rounded-md ring-1 focus:ring-2 ring-gray-300 focus:ring-gray-500 dark:bg-black dark:text-white dark:focus:ring-gray-100" pattern="[a-z0-9_]+" autoComplete="off" disabled={ disableProfile ? "disabled" : ""} required minLength="4" maxLength="20" value={ username }/>
                            <p className="px-1 py-0.5 text-left text-gray-500 dark:text-gray-300 text-xs md:text-sm">Only lowercase alphabets ( a-z ), numbers ( 0-9 ) and underscores ( _ ) are allowed</p>
                        </div>
                        <div className="w-full">
                            <label htmlFor="name" className="w-full font-semibold mb-1 dark:text-white">Full Name</label>
                            <input onChange={ handleNameChange } name="name" type="text" placeholder="Full Name" className="mt-1 w-full p-2 focus:outline-none rounded-md ring-1 focus:ring-2 ring-gray-300 focus:ring-gray-500 dark:bg-black dark:text-white dark:focus:ring-gray-100" disabled={ /*disableProfile ? "disabled" : ""*/ "disabled" } required minLength="2" value={ name }/>
                            <p className="px-1 py-0.5 text-left text-gray-500 dark:text-gray-300 text-xs md:text-sm">Special characters except hyphens ( - ) and underscores ( _ ) are not allowed</p>
                        </div>
                        <div className="w-full">
                            <label htmlFor="email" className="w-full font-semibold mb-1 dark:text-white">Email</label>
                            <input name="email" type="text" placeholder="Email" className="mt-1 w-full p-2 focus:outline-none rounded-md ring-1 focus:ring-2 ring-gray-300 focus:ring-gray-500 dark:bg-black dark:text-white dark:focus:ring-gray-100" disabled={ /*disableProfile ? "disabled" : ""*/ "disabled" } required value={ props.user.email }/>
                        </div>
                        <div className="w-full flex flex-col sm:flex-row gap-4">
                            <button type="submit" className="w-full sm:w-1/3 bg-blue-500 py-2 rounded-md font-bold text-white hover:bg-blue-600 focus:bg-blue-600" disabled={ disableProfile ? true : false}>Save</button>
                            <button className="w-full sm:w-1/3 bg-white py-2 rounded-md font-bold dark:bg-black text-black dark:text-white border border-gray-400 dark:border-gray-600 hover:bg-gray-100 focus:bg-gray-100 dark:hover:bg-gray-900 dark:focus:bg-gray-900" onClick={ (ev) => { ev.preventDefault(); setDisableProfile(false) } }>Edit profile</button>
                            <button className="w-full sm:w-1/3 bg-red-500 py-2 rounded-md font-bold text-white hover:bg-red-600 focus:bg-red-600" onClick={ (ev) => { ev.preventDefault(); deleteProfile(props.user._id.toString(), username, props.user.email) } }>Delete account</button>
                        </div>
                    </form>
                    <h2 className="w-full font-bold text-2xl md:text-3xl text-left dark:text-white">Security</h2>
                    <form action="/settings" method="POST" className="flex flex-col gap-4 justify-start items-center w-full p-1">
                        <div className="w-full">
                            <label htmlFor="opassword" className="w-full font-semibold mb-1 dark:text-white">Old password</label>
                            <input name="opassword" type="password" placeholder="Old password" className="mt-1 w-full p-2 focus:outline-none rounded-md ring-1 focus:ring-2 ring-gray-300 focus:ring-gray-500 dark:bg-black dark:text-white dark:focus:ring-gray-100" required disabled/>
                        </div>
                        <div className="w-full">
                            <label htmlFor="npassword" className="w-full font-semibold mb-1 dark:text-white">New password</label>
                            <input name="npassword" type="password" placeholder="New password" className="mt-1 w-full p-2 focus:outline-none rounded-md ring-1 focus:ring-2 ring-gray-300 focus:ring-gray-500 dark:bg-black dark:text-white dark:focus:ring-gray-100" required minLength="6" disabled/>
                            <p className="px-1 py-0.5 text-left text-gray-500 dark:text-gray-300 text-xs md:text-sm">Should contain at least one uppercase letter ( A-Z ), numbers ( 0-9 ) and a special character</p>
                        </div>
                        <div className="w-full">
                            <label htmlFor="cpassword" className="w-full font-semibold mb-1 dark:text-white">Confirm password</label>
                            <input name="cpassword" type="password" placeholder="Confirm password" className="mt-1 w-full p-2 focus:outline-none rounded-md ring-1 focus:ring-2 ring-gray-300 focus:ring-gray-500 dark:bg-black dark:text-white dark:focus:ring-gray-100" required disabled/>
                        </div>
                        <div className="w-full text-left">
                            <button type="submit" className="inline-block w-full sm:w-1/3 bg-blue-500 py-2 rounded-md font-bold text-white hover:bg-blue-600 focus:bg-blue-600" disabled>Change password</button>
                        </div>
                    </form>
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
        const profile = JSON.parse(JSON.stringify(await mClient.db("Client").collection("profiles").findOne({email: session.user.email})))
        
        if (!profile)
            return {
                redirect: {
                destination: "/complete/username"
                },
                props: {}
            }
        else {
            return {
                props: { user: profile }
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