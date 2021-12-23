import { useContext } from 'react'
import context from './context'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default function Preview() {
    const { markdownText } = useContext(context)

    return (
        <div className="flex flex-col justify-start items-center gap-2 w-full h-full">
            <h3 className="w-full text-left text-base md:text-lg xl:text-xl font-semibold mb-1 dark:text-white">Preview</h3>
            <ReactMarkdown remarkPlugins={ [remarkGfm] } className="p-4 w-full h-full rounded-md resize-none overflow-y-auto break-words focus:outline-none ring-1 focus:ring-2 ring-gray-300 focus:ring-gray-500 dark:text-white dark:focus:ring-gray-100">{ markdownText }</ReactMarkdown>
        </div>
    )
}