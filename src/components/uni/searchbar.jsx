import { useState } from 'react'

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
    const [optState, setOptState] = useState(false)

    return (
        <div className={"flex flex-row flex-nowrap " + (props.smhidesearch ? "justify-end" : "justify-start") + " items-center gap-4 w-full py-1"}>
            <input type="text" className={ (props.smhidesearch ? "hidden " : "inline ") + "sm:inline self-center rounded-md bg-gray-300 dark:bg-gray-500 bg-opacity-20 dark:bg-opacity-20 filter backdrop-blur-sm placeholder-gray-500 dark:placeholder-gray-300 text-sm sm:text-base md:text-lg xl:text-xl p-3 focus:outline-none text-black dark:text-white ring-1 focus:ring-2 ring-gray-300 focus:ring-gray-500 dark:focus:ring-gray-100 ring-opacity-100 focus:ring-opacity-40 w-full"}
                    placeholder={ props.placeholder } autoComplete="off"/>
            <button onClick={ () => { setOptState(!optState) } } className={ (!props.hideopts && optState ? "hidden " : "inline-block ") + "p-2 md:p-3 select-none self-center font-bold text-lg sm:text-xl xl:text-2xl text-white dark:text-black rounded-full bg-black dark:bg-white text-center"}>{ getInitials(props.user) }</button>
            { optState && <div className="flex flex-row gap-2 justify-start items-center">
                <button onClick={ () => { setOptState(!optState) } } className="self-center rounded-full hover:bg-gray-100 focus:bg-gray-200 dark:hover:bg-gray-700 dark:focus:bg-gray-800 p-1 md:p-3"><img src="/assets/home/cancel.svg" alt="Logout" className="w-6 md:w-12 mx-auto dark:filter dark:invert"/></button>
                <button className="self-center rounded-full hover:bg-gray-100 focus:bg-gray-200 dark:hover:bg-gray-700 dark:focus:bg-gray-800 p-1 md:p-3"><img src="/assets/home/box-arrow-left.svg" alt="Logout" className="w-6 md:w-12 mx-auto dark:filter dark:invert"/></button>
            </div> }
        </div>    
    )
}