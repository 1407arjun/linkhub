export default function Bar() {
    return (
        <div className="flex flex-row sm:hidden justify-evenly items-center p-2 w-full gap-4">
            <button className="flex flex-row justify-start items-center gap-2">
                <img src="/assets/posts/arrow-up.svg" alt="Upvotes"/>
                <span className="font-semibold font-sm lg:font-base">800</span>
            </button>
            <button className="flex flex-row justify-start items-center gap-2">
                <img src="/assets/posts/arrow-down.svg" alt="Downvotes"/>
                <span className="font-semibold">250</span>
            </button>
            <button className="flex flex-row justify-start items-center gap-2">
                <img src="/assets/posts/flag.svg" alt="Upvotes"/>
                <span className="font-semibold">2</span>
            </button>
        </div>
    )
}