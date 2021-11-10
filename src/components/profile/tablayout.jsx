export default function TabLayout() {
    return (
        <div className="overflow-x-auto grid grid-cols-3 justify-evenly items-center w-full gap-2 sm:gap-4 text-center font-semibold text-base md:text-lg">
            <button className="font-semibold py-1 hover:bg-gray-100 focus:bg-gray-100 dark:hover:bg-gray-800 dark:focus:bg-gray-800 border-b-2 border-blue-500 dark:text-white">Your Posts</button>
            <button className="py-1 hover:bg-gray-100 focus:bg-gray-100 dark:hover:bg-gray-800 dark:focus:bg-gray-800 dark:text-white">Upvoted</button>
            <button className="py-1 hover:bg-gray-100 focus:bg-gray-100 dark:hover:bg-gray-800 dark:focus:bg-gray-800 dark:text-white">Downvoted</button>
        </div>
    )
}
