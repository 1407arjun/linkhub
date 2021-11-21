import Profile from "./profile"

export default function HelpMini() {
    return (
        <div className="flex flex-col place-content-start gap-3 bg-gray-100 dark:bg-gray-900 rounded-3xl px-2 xl:px-4 py-4">
            <h3 className="text-base xl:text-lg font-bold text-gray-700 dark:text-gray-300 px-2">Check out the docs</h3>
            <ul className="px-4">
                <li className="text-sm xl:text-base font-semibold underline py-1 dark:text-white"><a>Posts</a></li>
                <li className="text-sm xl:text-base font-semibold underline py-1 dark:text-white"><a>Search</a></li>
                <li className="text-sm xl:text-base font-semibold underline py-1 dark:text-white"><a>Community</a></li>
                <li className="text-sm xl:text-base font-semibold underline py-1 dark:text-white"><a>Privacy</a></li>
            </ul>
            <a className="text-black dark:text-white text-center font-semibold bg-gray-300 dark:bg-gray-500 rounded-full px-4 py-2 w-full focus:bg-gray-400 dark:focus:bg-gray-600 hover:no-underline focus:no-underline">Go to the docs</a>
        </div>
    )
}