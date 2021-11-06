import { useState } from 'react'
import Link from 'next/link'

export default function Dropdown() {
    const [toggle, setToggle] = useState("hidden")

    return (
        <div className="relative" onClick={ () => { setToggle( toggle === "hidden" ? "flex" : "hidden") } }>
            <button className="flex-none self-center justify-self-end bg-white rounded-full hover:bg-gray-100 focus:bg-gray-200 p-1">
                <img src="/assets/posts/three-dots.svg" className="w-4 xl:w-6" alt="Menu"/>
            </button>
            <div className={"absolute z-10 flex-col bg-gray-200 rounded-md font-semibold gap-2 justify-center items-start shadow-md min-w-max " + toggle}>
                <Link href="/home" onClick={ () => setToggle("hidden") } className="p-4 hover:bg-gray-300 focus:bg-gray-300 rounded-md w-full">Delete post</Link>
                <Link href="/home" onClick={ () => setToggle("hidden") } className="p-4 hover:bg-gray-300 focus:bg-gray-300 rounded-md w-full">Save post</Link>
            </div>
        </div>
    )
}