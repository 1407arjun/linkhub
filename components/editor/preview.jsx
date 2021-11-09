import { useContext } from 'react'
import context from './context'

export default function Preview() {
    const { markdownText } = useContext(context)

    return (
        <div className="flex flex-col justify-start items-center gap-2">
            <h4 className="w-full text-left text-base md:text-lg xl:text-xl font-semibold mb-1">Preview</h4>
        </div>
    )
}