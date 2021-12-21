export default function Bar(props) {
    return (
        <div className="hidden sm:flex sm:flex-col justify-start items-center p-4 xl:p-8 gap-5">
            <button onClick={ () => props.update("upvoted") } className="flex flex-row justify-start items-center gap-2 w-full">
                <img src="/assets/posts/arrow-up.svg" alt="Upvotes"/>
                <span className={"font-semibold text-sm lg:text-base " + (props.option !== "upvoted" ? "text-black dark:text-white" : "text-green-600 dark:text-green-400")}>{ props.upvotes }</span>
            </button>
            <button onClick={ () => props.update("downvoted") } className="flex flex-row justify-start items-center gap-2 w-full">
                <img src="/assets/posts/arrow-down.svg" alt="Downvotes"/>
                <span className={"font-semibold text-sm lg:text-base " + (props.option !== "downvoted" ? "text-black dark:text-white" : "text-red-500 dark:text-red-400")}>{ props.downvotes }</span>
            </button>
            <button onClick={ () => props.update("flagged") } className="flex flex-row justify-start items-center gap-2 w-full">
                <img src="/assets/posts/flag.svg" alt="Flags"/>
                <span className={"font-semibold text-sm lg:text-base " + (props.option !== "flagged" ? "text-black dark:text-white" : "text-red-500 dark:text-red-400")}>{ props.flags }</span>
            </button>
        </div>
    )
}