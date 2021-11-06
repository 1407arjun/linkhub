import Save from "./save"

export default function SavedMini() {
    return (
        <div className="flex flex-col place-content-start gap-3 bg-gray-100 rounded-3xl px-2 xl:px-4 py-4">
            <h2 className="text-base xl:text-lg font-bold text-gray-700 px-2">Recently saved</h2>
            <div className="flex flex-col place-content-start"> {/* Max 3 Strip before entering*/}
                <Save name="A-Z Machine Learning" tag="machine-learning"/>
                <Save name="Web Development Bootcamp" tag="web-development"/>
                <Save name="Android N Development" tag="app-development"/>
            </div>
            <button className="text-black font-semibold bg-gray-300 rounded-full px-4 py-2 w-full focus:bg-gray-400">Show more</button>
        </div>
    )
}