import Recent from "./recent"

export default function RecentMini() {
    return (
        <div className="flex flex-col place-content-start gap-3 bg-gray-100 rounded-3xl px-2 xl:px-4 py-4">
            <h2 className="text-base xl:text-lg font-bold text-gray-700 px-2">Recently upvoted posts</h2>
            <div className="flex flex-col place-content-start"> {/* Max 5 Strip before entering*/}
                <Recent title="app-development" tag="8.2K"/>
                <Recent title="web-development" tag="15K"/>
                <Recent title="machine-learning" tag="5K"/>
                <Recent title="web-development" tag="15K"/>
                <Recent title="machine-learning" tag="5K"/>
            </div>
            <button className="text-black font-semibold bg-gray-300 rounded-full px-4 py-2 w-full focus:bg-gray-400">Show more</button>
        </div>
    )
}