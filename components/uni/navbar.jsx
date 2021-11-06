import NavBtn from "./navbtn"

export default function NavBar(props) {
    return (
        <div className="hidden md:flex flex-col justify-start items-center xl:items-start py-2 gap-1 border-r border-gray-300 w-1/6 lg:w-1/12 xl:w-1/6">
            <button className="px-2 lg:px-4 xl:px-8 py-2 xl:text-left">
                <div className="inline-block p-4 rounded-full hover:bg-gray-200 focus:bg-gray-600">
                    <img src="/assets/icon-black.svg" className="w-8 mx-auto xl:mx-0" alt=""/>
                </div>
            </button>
            <NavBtn src="/assets/home/grid.svg" href="/home" alt="Home" current={ props.current === "Home"}/>
            <NavBtn src="/assets/home/stars.svg" href="/explore" alt="Explore" current={ props.current === "Explore"}/>
            <NavBtn src="/assets/home/bookmark.svg" href="/saved" alt="Saved" current={ props.current === "Saved"}/>
            <NavBtn src="/assets/home/person.svg" alt="Profile" current={ props.current === "Profile"}/>
        </div>
    )
}