import Recent from "./recent"
import Link from "next/link"

export default function RecentMini() {
    return (
        <div className="flex flex-col place-content-start gap-3 bg-gray-100 dark:bg-gray-900 rounded-3xl px-2 xl:px-4 py-4">
            <h3 className="text-base xl:text-lg font-bold text-gray-700 dark:text-gray-300 px-2">Recently upvoted posts</h3>
            <div className="flex flex-col place-content-start"> {/* Max 5 Strip before entering*/}
                <Recent title="app-development" tag="8.2K" id=""/>
                <Recent title="web-development" tag="15K" id=""/>
                <Recent title="machine-learning" tag="5K" id=""/>
                <Recent title="web-development" tag="15K" id=""/>
                <Recent title="machine-learning" tag="5K" id=""/>
            </div>
            <Link href="/profile?tab=upvoted"><a className="text-center text-black dark:text-white font-semibold bg-gray-300 dark:bg-gray-500 rounded-full px-4 py-2 w-full focus:bg-gray-400 dark:focus:bg-gray-600 hover:no-underline focus:no-underline">Show more</a></Link>
        </div>
    )
}