import Recent from "./recent"
import Link from "next/link"

export default function RecentMini(props) {
    return (
        <div className={(props.upvoted.length > 0 ? "flex " : "hidden ") + "flex-col place-content-start gap-3 bg-gray-100 dark:bg-gray-900 rounded-3xl px-2 xl:px-4 py-4"}>
            <h3 className="text-base xl:text-lg font-bold text-gray-700 dark:text-gray-300 px-2">Recently upvoted posts</h3>
            <div className="flex flex-col place-content-start">
                { props.upvoted.map((data, index) => { return (
                    <Recent key={ index } title={ data.title } author={ data.author.name } id={ data._id.toString() } add={ !props.saved.includes(data._id.toString()) }/>
                ) }) }
            </div>
            <Link href="/profile?tab=upvoted"><a className="text-center text-black dark:text-white font-semibold bg-gray-300 dark:bg-gray-500 rounded-full px-4 py-2 w-full focus:bg-gray-400 dark:focus:bg-gray-600 hover:no-underline focus:no-underline">Show more</a></Link>
        </div>
    )
}