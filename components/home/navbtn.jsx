export default function NavBtn(props) {
    return (
        <button className={ (props.current ? "border-r-4 border-blue-500 " : "") + "px-2 lg:px-4 xl:px-8 py-2" }>
            <div className="flex flex-row justify-start items-center gap-2 p-4 xl:py-4 xl:pl-4 xl:pr-8 rounded-full hover:bg-gray-200 focus:bg-gray-600">
                <img src={ props.src } className="w-6 lg:w-8 mx-auto xl:mx-0" alt={ props.alt }/>
                <span className={"hidden xl:inline text-xl" + (props.current ? " font-bold" : "")}>{ props.alt }</span>
            </div>
        </button>
    )
} 