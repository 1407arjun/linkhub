import NavBtn from "./navbtn"

export default function NavBar(props) {
    return (
        <div className="hidden md:flex flex-col place-content-center py-2 gap-2 border-r border-gray-300">
            <NavBtn src="/assets/icon-black.svg" alt="" current={ false }/>
            <NavBtn src="/assets/home/grid.svg" alt="Home" current={ props.current === "Home"}/>
            <NavBtn src="/assets/home/stars.svg" alt="Explore" current={ props.current === "Explore"}/>
            <NavBtn src="/assets/home/bookmark.svg" alt="Saved" current={ props.current === "Saved"}/>
            <NavBtn src="/assets/home/person.svg" alt="Profile" current={ props.current === "Profile"}/>
            <NavBtn src="/assets/home/settings.svg" alt="Settings" current={ props.current === "Settings"}/>
        </div>
    )
}