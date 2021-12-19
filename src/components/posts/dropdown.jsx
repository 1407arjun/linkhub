import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import axios from 'axios'

export default function Dropdown(props) {
    const { data: session, status } = useSession()
    const [diff, setDiff] = useState("0s")
    const [saved, setSaved] = useState(props.saved)
    const router = useRouter()

    async function deletePost(id, email) {
        const submit = confirm("Are you sure you want to delete this post?")
        if (submit) {
            try {
                const res = await axios.post("/api/post/delete", { _id: id, email: email })
                if (res.status === 200)
                    router.push("/home")
                else
                    router.reload()    
            } catch (e) {
                console.log(e)
                router.reload()
            }
        }     
    }

    async function updateSaved(newSaved) {
        try {
            const r = await axios.post("/api/saved/update", { postId: props.id, remove: !newSaved })
            if (r.status === 200)
                setSaved(newSaved)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        let newDiff = Math.floor((new Date()) - (new Date(props.date)))
        let secs = Math.floor(newDiff/1000)
        if (secs > 59) {
            let mins = Math.floor(secs/60)
            if (mins > 59) {
                let hrs = Math.floor(mins/60)
                if (hrs > 23) {
                    let days = Math.floor(hrs/24)
                    if (days > 29) {
                        let months = Math.floor(days/30)
                        if (months > 11) {
                            let yrs = Math.floor(months/12)
                            setDiff(yrs.toString() + "y")
                        } else
                            setDiff(months.toString() + "mo")
                    } else
                        setDiff(days.toString() + "d")
                } else
                setDiff(hrs.toString() + "h")
            } else
                setDiff(mins.toString() + "m")
        } else
            setDiff(secs.toString() + "s")
    }, [props.date])

    return (
        <div className="flex flex-row justify-end items-center">
            { status === "authenticated" && <button onClick={ () => deletePost(props.id, props.email) } className={ "flex-none self-center justify-self-end bg-white dark:bg-black rounded-full hover:bg-gray-100 focus:bg-gray-200 dark:hover:bg-gray-700 dark:focus:bg-gray-800 p-2" + (props.delete ? "" : " hidden") }>
                <img src="/assets/posts/delete.svg" className="w-4 xl:w-6" alt="Menu"/>
            </button> }
            { status === "authenticated" && <button onClick={ () => {setSaved(!saved); updateSaved(saved);} } className="flex-none self-center justify-self-end bg-white dark:bg-black rounded-full hover:bg-gray-100 focus:bg-gray-200 dark:hover:bg-gray-700 dark:focus:bg-gray-800 p-2">
                { saved && <img src="/assets/posts/bookmark-done.svg" className="w-4 xl:w-6" alt="Saved"/> }
                { !saved && <img src="/assets/posts/bookmark.svg" className="w-4 xl:w-6 dark:filter dark:invert" alt="Save"/> }
            </button> }
            <p className="inline-block text-gray-500 dark:text-gray-300 text-base xl:text-lg p-2">{ diff }</p>
        </div>
    )
}