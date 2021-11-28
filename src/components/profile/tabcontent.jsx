import PostMini from "../posts/post-mini"

export default function TabContent() {
    return (
        <div className="flex flex-col gap-4 justify-start items-center w-full">
            <div className="flex flex-col justify-center items-start w-full px-2 sm:px-4 gap-2 sm:gap-4">
                {/* Posts go here*/ }
            </div>
            <p className="text-sm md:text-base italic dark:text-white">-- You have reached the end --</p>
        </div>
    )
}