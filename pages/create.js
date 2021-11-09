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
        <div className="h-screen">
            <Head title="New post &middot; LinkHub"/>
            <div className="flex flex-col justify-start items-start py-4 px-4 md:px-8 gap-6">
                <div className="flex flex-row justify-start items-center gap-2 w-full">
                    <Link href="/home"><a className="p-2 md:p-4 rounded-full hover:bg-gray-200 focus:bg-gray-200"><img src="/assets/editor/arrow-left.svg" className="w-8 sm:w-10 md:w-12 mx-auto" alt="Back"/></a></Link>
                    <h2 className="w-full font-bold text-2xl md:text-3xl text-left">New post</h2>
                    <div className="justify-self-end self-center hidden sm:block w-2/3">
                        <SearchBar placeholder="Search LinkHub"/>
                    </div>    
                </div>
                <form action="/create" method="POST" className="flex flex-col gap-2 justify-center items-start w-full px-0 md:px-2">
                    <div className="w-full md:w-4/5 lg:w-2/3 xl:w-1/2">
                        <input onChange={ handleTitleChange } name="title" type="text" placeholder="Title" className="w-full p-2 focus:outline-none rounded-md ring-1 ring-gray-300 focus:ring-gray-500 text-lg md:text-xl font-semibold" value={ titleText }/>
                        <p className="px-1 py-0.5 text-right text-gray-500 text-sm md:text-base">{ titleText.length + "/32" }</p>
                    </div>
                    <EditorContext.Provider value={ contextValue }>
                        <div className="w-full grid grid-rows-2 lg:grid-cols-2 justify-center items-start gap-4">
                            <Markdown/>
                            <Preview/>
                        </div>
                    </EditorContext.Provider>
                </form>
            </div>
            <Footer signedin={ true }/>
        </div>
    )
}