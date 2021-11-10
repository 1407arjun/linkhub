import { useState } from "react"
import Tag from "./tag"

export default function TagBar() {
    const [tags, setTags] = useState([])
    const [tagInput, setTagInput] = useState("")

    function handleTagsChange(ev) {
        let re = new RegExp("^[a-z\-]+$")
        let tag = ev.target.value.trim()
        if (ev.code === "Space") {
            if (re.test(tag) && !tags.includes(tag)) {
                setTags((prev) => { return [...prev, tag]})
            }
            setTagInput("")
        } else if (ev.target.value === "" && ev.code === "Backspace") {
            setTags((prev) => { return prev.filter(tag => { return tag !== prev[prev.length - 1] })})
        }
    }

    return (
        <div className="w-full lg:w-4/5 xl:w-2/3">
            <div className="p-1.5 flex flex-row flex-wrap gap-2 justify-start items-center rounded-md ring-1 focus:ring-2 ring-gray-300 focus:ring-gray-500 w-full">
                { tags.map((tag, index) => { return <Tag key={ index } name={ tag } update={ setTags }/>}) }
                <input onChange={ (ev) => { setTagInput(ev.target.value) } } onKeyUp={ handleTagsChange } name="tags" type="text" placeholder="Tags" className="w-full p-1 focus:outline-none dark:text-white dark:focus:ring-gray-100 dark:bg-black text-base md:text-lg font-semibold" value={ tagInput } autoComplete="off"/>
            </div>    
            <p className="px-1 py-0.5 text-left text-gray-500 dark:text-gray-300 text-sm md:text-base">Enter the tags with a space between them. Backspace to delete</p>
        </div>
    )
}