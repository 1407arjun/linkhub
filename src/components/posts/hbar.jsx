export default function Bar(props) {
    return (
        <div className="flex flex-row sm:hidden justify-evenly items-center px-2 pb-2 pt-1 md:py-2 w-full gap-4">
            <button onClick={ () => props.update("upvoted") } className="flex flex-row justify-start items-center gap-2">
                <img src="/assets/posts/arrow-up.svg" alt="Upvotes"/>
                <span className={"font-semibold text-sm lg:text-base " + (props.option !== "upvoted" ? "text-black dark:text-white" : "text-green-600 dark:text-green-4 00")}>{ props.upvotes }</span>
            </button>
            <button onClick={ () => props.update("downvoted") } className="flex flex-row justify-start items-center gap-2">
                <img src="/assets/posts/arrow-down.svg" alt="Downvotes"/>
                <span className={"font-semibold text-sm lg:text-base " + (props.option !== "downvoted" ? "text-black dark:text-white" : "text-red-500 dark:text-red-400")}>{ props.downvotes }</span>
            </button>
            <button onClick={ () => props.update("flagged") } className="flex flex-row justify-start items-center gap-2">
                <img src="/assets/posts/flag.svg" alt="Flags"/>
                <span className={"font-semibold text-sm lg:text-base " + (props.option !== "flagged" ? "text-black dark:text-white" : "text-red-500 dark:text-red-400")}>{ props.flags }</span>
            </button>
        </div>
    )
}