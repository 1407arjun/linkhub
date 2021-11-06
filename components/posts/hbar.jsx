export default function Bar(props) {
    return (
        <div className="flex flex-row justify-evenly items-center p-2 w-full gap-4 sm:hidden ">
            <button className="flex flex-row justify-start items-center gap-2">
                <img src="/assets/posts/arrow-up.svg" alt="Upvotes"/>
                <span className="font-semibold font-sm lg:font-base">{ props.upvotes }</span>
            </button>
            <button className="flex flex-row justify-start items-center gap-2">
                <img src="/assets/posts/arrow-down.svg" alt="Downvotes"/>
                <span className="font-semibold">{ props.downvotes }</span>
            </button>
            <button className="flex flex-row justify-start items-center gap-2">
                <img src="/assets/posts/flag.svg" alt="Upvotes"/>
                <span className="font-semibold">{ props.flags }</span>
            </button>
        </div>
    )
}