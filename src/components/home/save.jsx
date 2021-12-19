import Link from 'next/link'
import { useState } from 'react'
import axios from 'axios'

export default function Save(props) {
    const [del, setDel] = useState(true)
    
    async function removeFromSaved() {
        try {
            const r = await axios.post("/api/saved/update", { postId: props.id, remove: true })
            if (r.status === 200)
                setDel(false)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <Link href={ "/post/" + props.id }><a className="hover:no-underline focus:no-underline">
            <div className="flex flex-row flex-nowrap justify-between items-center gap-2 xl:gap-3 p-2 rounded-xl hover:bg-gray-200 focus:bg-gray-200 dark:hover:bg-gray-700 dark:focus:bg-gray-700">
                <div className="flex-none flex flex-row justify-start items-center gap-2 xl:gap-3">
                    <div className="self-center p-2 xl:p-3 rounded-full bg-black dark:bg-white">
                        <img src="/assets/home/bookmark-white.svg" className="w-3 xl:w-6 mx-auto dark:filter dark:invert" alt=""/>
                    </div>
                    <div className="self-center flex flex-col justify-center items-start">
                        <h4 className="text-sm xl:text-base font-semibold dark:text-white">{ props.title.length > 25 ? props.title.slice(0, 25) + "..." : props.title }</h4>
                        <p className="text-gray-500 dark:text-gray-300 text-xs xl:text-sm">{ props.author }</p>
                    </div>
                </div>
                { del && <button onClick={ () => removeFromSaved() } className="flex-none self-center justify-self-end bg-white dark:bg-black rounded-full">
                    <img src="/assets/home/delete-sq.svg" className="w-6 xl:w-8" alt="Remove"/>
                </button> }
            </div>
        </a></Link>
    )
} 