import { useState, useContext } from 'react'
import context from './context'

export default function Markdown() {
    const { markdownText, setMarkdownText } = useContext(context)

    function addTabSpace(ev) {
        if (ev.code === "Tab") {
            ev.preventDefault()
            setMarkdownText((prev) => { return prev + "\t" })
        }
    }

    return (
        <div className="flex flex-col justify-start items-center gap-2 w-full h-full">
            <h3 className="w-full text-left text-base md:text-lg xl:text-xl font-semibold mb-1 dark:text-white">Editor</h3>
            <textarea placeholder="Add your content..." onChange={ (ev) => { setMarkdownText(ev.target.value) } } onKeyDown={ addTabSpace } name="markdown" className="p-4 w-full h-full rounded-md resize-none overflow-y-auto focus:outline-none ring-1 focus:ring-2 ring-gray-300 focus:ring-gray-500 dark:bg-black dark:text-white dark:focus:ring-gray-100" value={ markdownText } autoComplete="off"></textarea>
        </div>
    )
}