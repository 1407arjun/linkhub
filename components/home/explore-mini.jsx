import Tag from "./tag"

export default function ExploreMini() {
    return (
        <div className="flex flex-col place-content-start gap-2 bg-gray-200 rounded-3xl px-4 xl:px-6 py-4">
            <a className="hover:underline focus:underline"><h2 className="text-base xl:text-lg font-bold text-gray-700">Tags to follow &#707;</h2></a>
            <div className="flex flex-col place-content-start gap-4"> {/* Max 5*/}
                <Tag/>
                <Tag/>
                <Tag/>
                <Tag/>
                <Tag/>
            </div>
        </div>
    )
}