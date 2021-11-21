import Link from "next/link"

export default function NavBtn(props) {
    return (
        <div className={ (props.current ? "border-r-4 border-blue-500 " : "") + "px-1 md:px-2 lg:px-4 xl:px-8 text-center w-full" }>
            <Link href={ props.href }><a className="inline-block xl:flex xl:flex-row justify-start items-center gap-2 p-4 xl:py-4 xl:pl-4 xl:pr-8 rounded-full hover:bg-gray-200 focus:bg-gray-200 dark:hover:bg-gray-800 dark:focus:bg-gray-800 hover:no-underline focus:no-underline">
                <img src={ props.src } className="w-6 md:w-8 mx-auto xl:mx-0 dark:filter dark:invert" alt={ props.alt }/>
                <span className={"hidden xl:inline text-xl dark:text-white" + (props.current ? " font-bold" : "")}>{ props.alt }</span>
            </a></Link>
        </div>
    )
} 