import { useState, useEffect } from "react"
import Tag from "./tag"

export default function TagBar(props) {
    const [tags, setTags] = useState([])
    const [tagInput, setTagInput] = useState("")

    useEffect(() => {
        props.update(tags)
    }, [tags])

    function handleTagsChange(ev) {
        /*let re = new RegExp("^[a-z\-]+$")
        let tag = ev.target.value.trim()
        if (ev.code === "Space") {
            if (re.test(tag) && !tags.includes(tag)) {
                setTags((prev) => { return [...prev, tag]})
            }
            setTagInput("")
        } else*/ 
        if (ev.code === "Enter")
            ev.preventDefault()
        
        if (ev.target.value === "" && ev.code === "Backspace") {
            setTags((prev) => { return prev.filter(tag => { return tag !== prev[prev.length - 1] })})
        }
    }

    /*function onTagChange(ev) {
        let re = new RegExp("^[a-z\-]+$")
        let val = ev.target.value.toLowerCase()
        if (val.substring(val.length - 1) === " ") {
            let tag = val.trim()
            if (tag.length >= 3 && re.test(tag) && !tags.includes(tag)) {
                setTags((prev) => { return [...prev, tag]})
            }
            setTagInput("")
        } else {
            if (val.length > 28)
                setTagInput(val.slice(0, 28))
            else
                setTagInput(val)
        }
    }*/

    function onTagChange(ev) {
        let re = new RegExp("^[a-z\-]*$")
        let val = ev.target.value.toLowerCase()

        if (val.substring(val.length - 1) === " ") {
            if (val.length > 32) {
                setTagInput(val.slice(0, 32))
            } else if (re.test(val) && val.length <= 32)
                setTagInput(val)
            
            let arr = tagInput.split('-')
            arr = arr.filter(data => {return data.length > 0})
            let tag = arr.join('-')

            if (tag.trim().length > 0 && !tags.includes(tag))
                setTags((prev) => { return [...prev, tag]})
                
            setTagInput("")
        } else {
            if (val.length > 32) {
                setTagInput(val.slice(0, 32))
            } else if (re.test(val) && val.length <= 32)
                setTagInput(val)
        }
    }

    return (
        <div className="w-full lg:w-4/5 xl:w-2/3">
            <div className="p-1.5 flex flex-row flex-wrap gap-2 justify-start items-center rounded-md ring-1 focus:ring-2 ring-gray-300 focus:ring-gray-500 w-full">
                { tags.map((tag, index) => { return <Tag key={ index } name={ tag } update={ setTags }/>}) }
                <input list="suggestions" onChange={ onTagChange } onKeyDown={ handleTagsChange } name="tags" type="text" placeholder="Tags" className="w-full p-1 focus:outline-none dark:text-white dark:focus:ring-gray-100 dark:bg-black text-base md:text-lg font-semibold" value={ tagInput } autoComplete="off"/>
                <p className="px-1 py-0.5 w-full text-right text-gray-500 dark:text-gray-300 text-sm md:text-base">{ tagInput.length + " of 32 characters" }</p>
                <datalist id="suggestions">
                    { props.suggestions.map((tag, index) => {
                        return <option key={ index } value={ tag.name }/>
                    }) }
                </datalist>
            </div>    
            <p className="px-1 py-0.5 text-left text-gray-500 dark:text-gray-300 text-sm md:text-base">Only alphabets and hyphens ( - ) are allowed. Enter the tags with a space between them. Backspace to delete.</p>
        </div>
    )
}
