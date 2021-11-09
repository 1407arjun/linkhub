export default function Bar(props) {
    return (
        <div className="flex flex-row sm:hidden justify-evenly items-center px-2 pb-2 pt-1 md:py-2 w-full gap-4">
            <button className="flex flex-row justify-start items-center gap-2">
                <img src="/assets/posts/arrow-up.svg" alt="Upvotes"/>
                <span className="font-semibold text-sm lg:text-base">{ props.upvotes }</span>
            </button>
            <button className="flex flex-row justify-start items-center gap-2">
                <img src="/assets/posts/arrow-down.svg" alt="Downvotes"/>
                <span className="font-semibold text-sm lg:text-base">{ props.downvotes }</span>
            </button>
            <button className="flex flex-row justify-start items-center gap-2">
                <img src="/assets/posts/flag.svg" alt="Upvotes"/>
                <span className="font-semibold text-sm lg:text-base">{ props.flags }</span>
            </button>
        </div>
    )
}