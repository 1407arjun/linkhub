import Tag from "./tag"

export default function ExploreMini() {
    return (
        <div className="flex flex-col place-content-start gap-3 bg-gray-100 rounded-3xl px-2 xl:px-4 py-4">
            <h2 className="text-base xl:text-lg font-bold text-gray-700 px-2">Tags to follow</h2>
            <div className="flex flex-col place-content-start"> {/* Max 5 Strip before entering*/}
                <Tag name="app-development" follow="8.2K"/>
                <Tag name="web-development" follow="15K"/>
                <Tag name="machine-learning" follow="5K"/>
            </div>
            <button className="text-black font-semibold bg-gray-300 rounded-full px-4 py-2 w-full focus:bg-gray-400">Show more</button>
        </div>
    )
}