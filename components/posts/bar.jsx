export default function Bar() {
    return (
        <div className="flex flex-col justify-start items-center p-4 w-1/6 gap-5">
            <button className="flex flex-row justify-start items-center gap-2 w-full">
                <img src="/assets/posts/arrow-up.svg" alt="Upvotes"/>
                <span className="font-semibold">800</span>
            </button>
            <button className="flex flex-row justify-start items-center gap-2 w-full">
                <img src="/assets/posts/arrow-down.svg" alt="Downvotes"/>
                <span className="font-semibold">250</span>
            </button>
            <button className="flex flex-row justify-start items-center gap-2 w-full">
                <img src="/assets/posts/flag.svg" alt="Upvotes"/>
                <span className="font-semibold">2</span>
            </button>
        </div>
    )
}