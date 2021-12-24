import { useState } from 'react'
import { signOut } from "next-auth/react"
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import router from 'next/router'

function getInitials(name) {
    let array = name.split(" ")
    if (array.length > 1) {
        return array[0].slice(0, 1).toUpperCase() + array[1].slice(0, 1).toUpperCase()
    } else {
        if (array[0].length > 1)
            return array[0].slice(0, 2).toUpperCase()
        else
        return (array[0].slice(0, 1).toUpperCase() + "0")
    }
}

export default function SearchBar(props) {
    const { data: session, status } = useSession()
    const [optState, setOptState] = useState(false)
    const [text, setText] = useState(props.text ? props.text : "")

    async function postQuery(ev) {
        ev.preventDefault()
        router.push("/explore?query=" + ev.target[0].value)
    }

    return (
        <div className={"flex flex-row flex-nowrap " + (props.smhidesearch ? "justify-end" : "justify-start") + " items-center gap-4 w-full py-1"}>
            { status !== "authenticated" && <Link href="/home"><a className="inline-block p-2 rounded-full hover:bg-gray-200 focus:bg-gray-200 dark:hover:bg-gray-800 dark:focus:bg-gray-800 hover:no-underline focus:no-underline"><img src="/assets/icon-black.svg" className="w-12 md:w-14 dark:filter dark:invert" alt=""/></a></Link> }
            <form onSubmit={ postQuery } className={ (props.smhidesearch ? "hidden " : "inline ") + "sm:inline self-center w-full" }>
                <input name="query" onChange={ (ev) => setText(ev.target.value) } type="text" className="rounded-md bg-gray-300 dark:bg-gray-500 bg-opacity-20 dark:bg-opacity-20 filter backdrop-blur-sm placeholder-gray-500 dark:placeholder-gray-300 text-sm sm:text-base md:text-lg xl:text-xl p-3 focus:outline-none text-black dark:text-white ring-1 focus:ring-2 ring-gray-300 focus:ring-gray-500 dark:focus:ring-gray-100 ring-opacity-100 focus:ring-opacity-40 w-full"
                        placeholder={ props.placeholder } value={ text } autoComplete="off"/>
            </form>
            { status === "authenticated" && <button onClick={ () => { setOptState(!optState) } } className={ (optState ? "hidden " : "inline-block ") + "select-none self-center font-bold text-lg sm:text-xl xl:text-2xl text-white dark:text-black rounded-full text-center" + (session.user.image ? "" : " p-2 md:p-3 bg-black dark:bg-white")}>{ session.user.image ? <img src={ session.user.image } alt="" className="rounded-full w-12 sm:w-14"/> : getInitials(session.user.name) }</button> }
            { status !== "authenticated" && <Link href="/login"><a className="whitespace-nowrap h-full text-base sm:text-lg xl:text-xl text-black dark:text-white rounded-md border-2 border-gray-500 dark:border-gray-300 p-2 md:p-3 hover:no-underline focus:no-underline hover:bg-gray-100 focus:bg-gray-200 dark:hover:bg-gray-700 dark:focus:bg-gray-800">Sign In</a></Link>}
            { optState && <div className="flex flex-row gap-2 justify-start items-center">
                <button onClick={ () => { setOptState(!optState) } } className="self-center rounded-full hover:bg-gray-100 focus:bg-gray-200 dark:hover:bg-gray-700 dark:focus:bg-gray-800 p-1 md:p-3"><img src="/assets/home/cancel.svg" alt="Logout" className="w-6 md:w-12 mx-auto dark:filter dark:invert"/></button>
                <button onClick={ () => signOut() } className="self-center rounded-full hover:bg-gray-100 focus:bg-gray-200 dark:hover:bg-gray-700 dark:focus:bg-gray-800 p-1 md:p-3"><img src="/assets/home/box-arrow-left.svg" alt="Logout" className="w-6 md:w-12 mx-auto dark:filter dark:invert"/></button>
            </div> }
        </div>    
    )
}