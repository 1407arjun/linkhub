import Profile from "./profile"

export default function HelpMini() {
    return (
        <div className="flex flex-col place-content-start gap-3 bg-gray-100 rounded-3xl px-2 xl:px-4 py-4">
            <h2 className="text-base xl:text-lg font-bold text-gray-700 px-2">Check out the docs</h2>
            <ul className="px-4">
                <li className="text-sm xl:text-base font-semibold underline py-1"><a>Posts</a></li>
                <li className="text-sm xl:text-base font-semibold underline py-1"><a>Search</a></li>
                <li className="text-sm xl:text-base font-semibold underline py-1"><a>Community</a></li>
                <li className="text-sm xl:text-base font-semibold underline py-1"><a>Privacy</a></li>
            </ul>
            <a className="text-black text-center font-semibold bg-gray-300 rounded-full px-4 py-2 w-full focus:bg-gray-400">Go to the docs</a>
        </div>
    )
}