import { useContext } from 'react'
import context from './context'

export default function Markdown() {
    const { setMarkdownText } = useContext(context)

    return (
        <div className="flex flex-col justify-start items-center gap-2">
            <h4 className="w-full text-left text-base md:text-lg xl:text-xl font-semibold mb-1">Editor</h4>
            <textarea onChange={ (ev) => { setMarkdownText(ev.target.value) } } name="markdown" className="p-4 w-full rounded-md resize-none overflow-y-auto focus:outline-none border border-gray-400"></textarea>
        </div>
    )
}