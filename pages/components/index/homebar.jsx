import SearchBar from '../uni/searchbar'

export default function HomeBar() {
    return (
        <div className="flex flex-row p-4">
            <img src="/assets/logo.svg" className="w-1/3 md:w-1/4 xl:w-1/6 mx-auto lg:mr-4" alt="LinkHub"/>
            <div className="hidden md:inline-flex flex-row flex-auto justify-start content-center mr-4">
                <button className="mr-2 text-l text-white border-transparent hover:border-b-white border-4 p-2 hover:">About</button>
            </div>
            <div className="inline-flex flex-row-reverse flex-auto justify-start content-center">
                <button className="inline md:hidden ml-1 text-l text-white p-1">Nav</button>
                <button className="mx-1 md:ml-2 text-l text-white rounded-md border-2 border-white p-1">Sign Up</button>
                <button className="mr-1 md:mr-2 text-l text-white rounded-md border-2 border-transparent p-1">Sign In</button>
            </div>
        </div>  
    )
}