import Link from "next/link"
import { useRouter } from "next/router"

export default function TabLayout(props) {
    const router = useRouter()
    
    return (
        <div className="overflow-x-auto grid grid-cols-2 grid-rows-2 sm:grid-cols-4 sm:grid-rows-1 justify-evenly items-center w-full gap-2 sm:gap-4 text-center text-base md:text-lg">
            <Link href="/profile"><a className={"text-center py-1 hover:bg-gray-100 focus:bg-gray-100 dark:hover:bg-gray-800 dark:focus:bg-gray-800 dark:text-white hover:no-underline focus:no-underline" + (props.tab === null ? (" font-semibold border-b-2 border-blue-500") : "")}>Your Posts</a></Link>
            <Link href="/profile?tab=upvoted"><a className={"text-center py-1 hover:bg-gray-100 focus:bg-gray-100 dark:hover:bg-gray-800 dark:focus:bg-gray-800 dark:text-white hover:no-underline focus:no-underline" + (props.tab === "upvoted" ? (" font-semibold border-b-2 border-blue-500") : "")}>Upvoted</a></Link>
            <Link href="/profile?tab=downvoted"><a className={"text-center py-1 hover:bg-gray-100 focus:bg-gray-100 dark:hover:bg-gray-800 dark:focus:bg-gray-800 dark:text-white hover:no-underline focus:no-underline" + (props.tab === "downvoted" ? (" font-semibold border-b-2 border-blue-500") : "")}>Downvoted</a></Link>
            <Link href="/profile?tab=tags"><a className={"text-center py-1 hover:bg-gray-100 focus:bg-gray-100 dark:hover:bg-gray-800 dark:focus:bg-gray-800 dark:text-white hover:no-underline focus:no-underline" + (props.tab === "tags" ? (" font-semibold border-b-2 border-blue-500") : "")}>Tags</a></Link>
        </div>
    )

    /*
    <button onClick={() => router.push("/profile")} className={"text-center py-1 hover:bg-gray-100 focus:bg-gray-100 dark:hover:bg-gray-800 dark:focus:bg-gray-800 dark:text-white hover:no-underline focus:no-underline" + (props.tab === null ? (" font-semibold border-b-2 border-blue-500") : "")}>Your Posts</button>
            <button onClick={() => router.push("/profile?tab=upvoted")} className={"text-center py-1 hover:bg-gray-100 focus:bg-gray-100 dark:hover:bg-gray-800 dark:focus:bg-gray-800 dark:text-white hover:no-underline focus:no-underline" + (props.tab === "upvoted" ? (" font-semibold border-b-2 border-blue-500") : "")}>Upvoted</button>
            <button onClick={() => router.push("/profile?tab=downvoted")} className={"text-center py-1 hover:bg-gray-100 focus:bg-gray-100 dark:hover:bg-gray-800 dark:focus:bg-gray-800 dark:text-white hover:no-underline focus:no-underline" + (props.tab === "downvoted" ? (" font-semibold border-b-2 border-blue-500") : "")}>Downvoted</button>
   */         
}
