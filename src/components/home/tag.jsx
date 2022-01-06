import Link from 'next/link'
import axios from 'axios'
import { useState } from 'react'
import { useSession } from 'next-auth/react'

export default function Tag(props) {
    const { data: session, status } = useSession()
    const [follow, setFollow] = useState(props.follow)

    async function addToTags(newFollow) {
        setFollow(!newFollow)
        try {
            const r = await axios.post("/api/tag/update", { tag: props.name, remove: false })
            if (r.status !== 200)
                setFollow(newFollow)
        } catch (e) {
            console.log(e)
        }
    }

    async function removeFromTags(newFollow) {
        setFollow(!newFollow)
        try {
            const r = await axios.post("/api/tag/update", { tag: props.name, remove: true })
            if (r.status !== 200)
                setFollow(newFollow)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className="flex flex-row flex-nowrap justify-between items-center gap-2 xl:gap-3 p-2 rounded-xl hover:bg-gray-200 focus:bg-gray-200 dark:hover:bg-gray-700 dark:focus:bg-gray-700">
            <Link href={ "/tag/" + props.name }><a className="hover:no-underline focus:no-underline w-full"><div className="flex-none flex flex-row justify-start items-center gap-2 xl:gap-3">
                <div className="self-center p-2 xl:p-3 rounded-full bg-black dark:bg-white">
                    <img src="/assets/home/tag.svg" className="w-3 md:w-6 mx-auto dark:filter dark:invert" alt=""/>
                </div>
                <div className="self-center flex flex-col justify-center items-start w-full">
                    <h4 className="text-sm xl:text-base font-semibold dark:text-white">{ props.name.length > 25 ? props.name.slice(0, 25) + "..." : props.name }</h4>
                    <p className="text-gray-500 dark:text-gray-300 text-xs xl:text-sm">{ props.post + " posts"}</p>
                </div>
            </div></a></Link>
            { status === "authenticated" && !follow && <button onClick={ () => addToTags(follow) } className="flex-none self-center justify-self-end bg-white dark:bg-black rounded-full">
                <img src="/assets/home/plus-sq.svg" className="w-6 xl:w-8" alt="Add"/>
            </button> }
            { status === "authenticated" && follow && <button onClick={ () => removeFromTags(follow) } className="flex-none self-center justify-self-end bg-white dark:bg-black rounded-full">
                <img src="/assets/home/delete-sq.svg" className="w-6 xl:w-8" alt="Remove"/>
            </button> }
        </div>
    )
} 