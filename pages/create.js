import Link from 'next/link'
import Head from '../components/uni/head'
import Footer from '../components/uni/footer'
import { useState } from 'react'
import Markdown from '../components/editor/markdown'
import Preview from '../components/editor/preview'
import EditorContext from '../components/editor/context'
import SearchBar from '../components/uni/searchbar'

export default function Explore() {
    const [titleText, setTitleText] = useState("")
    const [markdownText, setMarkdownText] = useState("")
    const contextValue = { markdownText, setMarkdownText }

    function handleTitleChange(ev) {
        if (ev.target.value.length > 32)
            setTitleText(ev.target.value.slice(0, 32))
        else
            setTitleText(ev.target.value)    
    } 

    return (
        <div className="dark:bg-black h-screen">
            <Head title="New post &middot; LinkHub"/>
            <div className="flex flex-col justify-start items-start py-4 px-4 md:px-8 gap-6 h-full">
                <div className="flex flex-row justify-start items-center gap-2 w-full">
                    <Link href="/home"><a className="p-2 md:p-4 rounded-full hover:bg-gray-200 focus:bg-gray-200 dark:hover:bg-gray-800 dark:focus:bg-gray-800"><img src="/assets/editor/arrow-left.svg" className="w-8 sm:w-10 md:w-12 mx-auto" alt="Back"/></a></Link>
                    <h2 className="w-full font-bold text-2xl md:text-3xl text-left">New post</h2>
                    <div className="justify-self-end self-center hidden sm:block w-2/3">
                        <SearchBar placeholder="Search LinkHub"/>
                    </div>    
                </div>
                <form action="/create" method="POST" className="flex flex-col gap-3 justify-center items-start w-full px-0 md:px-2 h-full">
                    <div className="w-full md:w-4/5 lg:w-2/3 xl:w-1/2">
                        <input onChange={ handleTitleChange } name="title" type="text" placeholder="Title" className="w-full p-2 focus:outline-none rounded-md ring-1 focus:ring-2 ring-gray-300 focus:ring-gray-500 dark:bg-black dark:text-white dark:focus:ring-gray-100 text-lg md:text-xl font-semibold" value={ titleText }/>
                        <p className="px-1 py-0.5 text-right text-gray-500 dark:text-gray-300 text-sm md:text-base">{ titleText.length + " of 32 characters" }</p>
                    </div>
                    <EditorContext.Provider value={ contextValue }>
                        <div className="grid grid-rows-2 grid-cols-1 lg:grid-rows-1 lg:grid-cols-2 justify-center items-start gap-4 w-full h-full rounded-md border border-gray-300 p-3 lg:p-4">
                            <Markdown/>
                            <Preview/>
                        </div>
                    </EditorContext.Provider>
                    <div className="w-full lg:w-4/5 xl:w-2/3">
                        <input name="tags" type="text" placeholder="Tags" className="w-full p-2 focus:outline-none rounded-md ring-1 focus:ring-2 ring-gray-300 focus:ring-gray-500 dark:text-white dark:focus:ring-gray-100 dark:bg-black text-base md:text-lg font-semibold"/>
                        <p className="px-1 py-0.5 text-left text-gray-500 dark:text-gray-300 text-sm md:text-base">Enter the tags with a space between them</p>
                    </div>
                    <button className="w-full md:w-auto flex flex-row justify-center items-center gap-3 px-6 py-3 rounded-md bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 focus:ring-opacity-60">
                        <img src="/assets/editor/send.svg" className="w-5 md:w-6" alt="Post"/>
                        <span className="text-lg md:text-xl font-semibold text-white">Post</span>
                    </button>
                </form>
            </div>
            <Footer signedin={ true }/>
        </div>
    )
}