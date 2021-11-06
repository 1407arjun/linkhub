export default function Dropdown(props) {
    return (
        <div>
            <button className={ "flex-none self-center justify-self-end bg-white rounded-full hover:bg-gray-100 focus:bg-gray-200 p-2" + (props.delete ? "" : " hidden") }>
                <img src="/assets/posts/delete.svg" className="w-4 xl:w-6" alt="Menu"/>
            </button>
            <button className="flex-none self-center justify-self-end bg-white rounded-full hover:bg-gray-100 focus:bg-gray-200 p-2">
                <img src={ props.saved ? "/assets/posts/bookmark-done.svg" : "/assets/posts/bookmark.svg" } className="w-4 xl:w-6" alt={ props.saved ? "Saved" : "Save" }/>
            </button>
        </div>
    )
}