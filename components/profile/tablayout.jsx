export default function TabLayout() {
    return (
        <div className="overflow-x-auto grid grid-cols-3 justify-evenly items-center w-full gap-2 sm:gap-4 text-center font-semibold text-xs sm:text-base md:text-lg">
            <button className="py-1 hover:bg-gray-100 focus:bg-gray-100 border-b-2 border-blue-500">Your Posts</button>
            <button className="py-1 hover:bg-gray-100 focus:bg-gray-100">Upvoted Posts</button>
            <button className="py-1 hover:bg-gray-100 focus:bg-gray-100">Downvoted Posts</button>
        </div>
    )
}