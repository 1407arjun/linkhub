import Bar from './bar'
import HBar from './hbar'
import TagBar from './tagbar'
import Dropdown from './dropdown'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Link from 'next/link'
import { useState } from 'react'
import axios from 'axios'
import { useSession } from 'next-auth/react'
 
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

export default function PostMini(props) {
    const [option, setOption] = useState(props.option)
    const [upvotes, setUpvotes] = useState(props.upvotes)
    const [downvotes, setDownvotes] = useState(props.downvotes)
    const [flags, setFlags] = useState(props.flags)
    const { data: session, status } = useSession()

    async function updateOption(newOption) {
        if (session && session.user && status === "authenticated") {
            let prevOption = option

            if (prevOption === newOption) {
                newOption = null
                setOption(null)
            } else {    
                setOption(newOption)
            }     

            switch(newOption) {
                case "upvoted":
                    setUpvotes((prev) => {return prev + 1})
                    break
                case "downvoted":
                    setDownvotes((prev) => {return prev + 1})
                    break
                case "flagged":
                    setFlags((prev) => {return prev + 1})
                    break
                default:
                    break            
            }

            switch(prevOption) {
                case "upvoted":
                    setUpvotes((prev) => {return prev - 1})
                    break
                case "downvoted":
                    setDownvotes((prev) => {return prev - 1})
                    break
                case "flagged":
                    setFlags((prev) => {return prev - 1})
                    break
                default:
                    break            
            }

            try {
                const r = await axios.post("/api/post/update", { postId: props.id, add: newOption, remove: prevOption })
                if (r.status !== 200) {
                    setOption(prevOption)

                    switch(prevOption) {
                        case "upvoted":
                            setUpvotes((prev) => {return prev + 1})
                            break
                        case "downvoted":
                            setDownvotes((prev) => {return prev + 1})
                            break
                        case "flagged":
                            setFlags((prev) => {return prev + 1})
                            break
                        default:
                            break            
                    }

                    switch(newOption) {
                        case "upvoted":
                            setUpvotes((prev) => {return prev - 1})
                            break
                        case "downvoted":
                            setDownvotes((prev) => {return prev - 1})
                            break
                        case "flagged":
                            setFlags((prev) => {return prev - 1})
                            break
                        default:
                            break            
                    }
                }     
            } catch (e) {
                console.log(e)
            }
        } else
            alert("You must be logged in to perform this action")
    }

    return (
        <div className="flex flex-col gap-1 place-content-start rounded-xl border border-gray-300 dark:border-gray-600 w-full p-2">
            <div className="flex flex-row flex-nowrap justify-between items-center gap-2 xl:gap-3 px-2 w-full">
                <div className="flex-none flex flex-row justify-start items-center gap-2 xl:gap-3">
                    <span className={"select-none self-center inline-block font-bold text-lg sm:text-xl xl:text-2xl text-white dark:text-black rounded-full text-center" + (props.image ? "" : " p-2 bg-black dark:bg-white")}>{ props.image ? <img src={ props.image } alt="" className="rounded-full w-9 sm:w-10 xl:w-12"/> : getInitials(props.name) }</span>
                    <div className="self-center flex flex-col justify-center items-start">
                        <Link href={ "/profile/" + props.username }><a className="hover:no-underline focus:no-underline">
                            <h4 className="text-sm xl:text-base font-semibold hover:underline focus:underline dark:text-white">{ props.name }</h4>
                            <p className="text-gray-500 dark:text-gray-300 text-xs xl:text-sm">{ "@" + props.username }</p>
                        </a></Link>
                    </div>
                </div>
                <Dropdown id={ props.id } title={ props.title } email={ props.email } delete={ props.delete } saved={ props.saved } date={ props.date }/>
            </div>
            <div className="flex flex-row gap-2 place-content-start w-full px-2 sm:px-0">
                <Bar upvotes={ upvotes } downvotes={ downvotes } flags={ flags } option={ option } update={ updateOption }/>
                <div className="flex flex-col gap-1 place-content-start w-full sm:w-5/6 py-2">
                    <h1 className="dark:text-white">{ props.title }</h1>
                    <ReactMarkdown remarkPlugins={ [remarkGfm] } className="dark:text-white overflow-y-auto break-words">{ props.body }</ReactMarkdown>
                    <div className="flex flex-row flex-wrap gap-2 justify-start items-center pt-2 pb-3">
                        { props.tags.map((tag, index) => { return <TagBar key={ index } name={ tag }/> }) }
                    </div>
                </div>
            </div>
            <HBar upvotes={ upvotes } downvotes={ downvotes } flags={ flags } option={ option } update={ updateOption }/>
        </div>
    )
}