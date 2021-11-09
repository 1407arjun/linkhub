export default function Bar(props) {
    return (
        <div className="hidden sm:flex sm:flex-col justify-start items-center p-4 w-1/6 gap-5">
            <button className="flex flex-row justify-start items-center gap-2 w-full">
                <img src="/assets/posts/arrow-up.svg" alt="Upvotes"/>
                <span className="font-semibold text-sm lg:text-base">{ props.upvotes }</span>
            </button>
            <button className="flex flex-row justify-start items-center gap-2 w-full">
                <img src="/assets/posts/arrow-down.svg" alt="Downvotes"/>
                <span className="font-semibold text-sm lg:text-base">{ props.downvotes }</span>
            </button>
            <button className="flex flex-row justify-start items-center gap-2 w-full">
                <img src="/assets/posts/flag.svg" alt="Upvotes"/>
                <span className="font-semibold text-sm lg:text-base">{ props.flags }</span>
            </button>
        </div>
    )
}