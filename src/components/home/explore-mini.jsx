import Tag from "./tag"

export default function ExploreMini() {
    return (
        <div className="flex flex-col place-content-start gap-3 bg-gray-100 dark:bg-gray-900 rounded-3xl px-2 xl:px-4 py-4">
            <h3 className="text-base xl:text-lg font-bold text-gray-700 dark:text-gray-300 px-2">Tags to follow</h3>
            <div className="flex flex-col place-content-start"> {/* Max 5 Strip before entering*/}
                <Tag name="app-development" follow="8.2K"/>
                <Tag name="web-development" follow="15K"/>
                <Tag name="machine-learning" follow="5K"/>
            </div>
            <button className="text-black dark:text-white font-semibold bg-gray-300 dark:bg-gray-500 rounded-full px-4 py-2 w-full focus:bg-gray-400 dark:focus:bg-gray-600">Show more</button>
        </div>
    )
}