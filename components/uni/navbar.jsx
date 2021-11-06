import NavBtn from "./navbtn"

export default function NavBar(props) {
    return (
        <div className="hidden md:flex flex-col justify-start items-center xl:items-start py-2 gap-1 border-r border-gray-300 w-1/6 lg:w-1/12 xl:w-1/6">
            <a className="px-2 lg:px-4 xl:px-8 py-2">
                <div className=" block p-4 rounded-full hover:bg-gray-200 focus:bg-gray-600">
                    <img src="/assets/icon-black.svg" className="w-8" alt=""/>
                </div>
            </a>
            <NavBtn src="/assets/home/grid.svg" href="/home" alt="Home" current={ props.current === "Home"}/>
            <NavBtn src="/assets/home/stars.svg" href="/explore" alt="Explore" current={ props.current === "Explore"}/>
            <NavBtn src="/assets/home/bookmark.svg" href="/saved" alt="Saved" current={ props.current === "Saved"}/>
            <NavBtn src="/assets/home/person.svg" href="/profile" alt="Profile" current={ props.current === "Profile"}/>
            <NavBtn src="/assets/home/settings.svg" href="/settings" alt="Settings" current={ props.current === "Settings"}/>
            <br/>

            <a href="/create" className="px-2 lg:px-4 xl:px-8 w-full">
                <div className="block xl:flex xl:flex-row justify-start items-center gap-2 p-4 xl:py-4 xl:pl-4 xl:pr-8 rounded-full bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 focus:ring-opacity-60">
                    <img src="/assets/posts/link-45.svg" className="w-8 mx-auto xl:mx-0" alt="Create"/>
                    <span className="hidden xl:inline text-xl font-semibold text-white">Create</span>
                </div>
            </a>
        </div>
    )
}