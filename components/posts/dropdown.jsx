export default function Dropdown(props) {
    return (
        <div className="flex flex-row justify-end items-center">
            <button className={ "flex-none self-center justify-self-end bg-white rounded-full hover:bg-gray-100 focus:bg-gray-200 p-2" + (props.delete ? "" : " hidden") }>
                <img src="/assets/posts/delete.svg" className="w-4 xl:w-6" alt="Menu"/>
            </button>
            <button className="flex-none self-center justify-self-end bg-white rounded-full hover:bg-gray-100 focus:bg-gray-200 p-2">
                <img src={ props.saved ? "/assets/posts/bookmark-done.svg" : "/assets/posts/bookmark.svg" } className="w-4 xl:w-6" alt={ props.saved ? "Saved" : "Save" }/>
            </button>
            <p className="inline-block text-gray-500 text-base xl:text-lg p-2">2d</p>
        </div>
    )
}