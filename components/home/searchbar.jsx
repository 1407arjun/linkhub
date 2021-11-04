export default function SearchBar() {
    return (
        <div className="w-full flex flex-row justify-start items-center gap-4">
            <button className="inline md:hidden w-10"><img src="/assets/home/menu.svg" className="w-full" alt="Nav"/></button>
            <input type="text" className="inline self-center rounded-md bg-gray-300 bg-opacity-20 filter backdrop-blur-sm placeholder-gray-500
                    text-sm sm:text-base md:text-lg xl:text-xl p-3 focus:outline-none focus:text-black ring-1 focus:ring-2 ring-gray-300 focus:ring-gray-500 ring-opacity-100 focus:ring-opacity-40 w-full" 
                    placeholder="What would you like to learn today?"/>
        </div>
    )
}