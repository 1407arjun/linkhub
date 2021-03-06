export default function SearchBar() {
    return (
        <input type="text" className="hidden md:inline self-center rounded-md bg-white bg-opacity-20 backdrop-blur-sm placeholder-gray-200
                text-lg px-2 py-1.5 focus:outline-none text-white mr-1 md:mr-2 ring-1 ring-white ring-opacity-60 focus:ring-opacity-100 w-1/3 md:w-1/2" 
                placeholder="Search LinkHub" autoComplete="off"/>
    )
}