export default function SearchBar() {
    return (
        <form action="/search" method="POST" className="mt-4 md:mt-8">
            <div className="flex flex-col sm:flex-row justify-items-strech sm:justify-items-start gap-y-2 sm:gap-x-2 sm:mx-auto">
                <input type="text" className="self-center rounded-md bg-white px-4 py-3 shadow-lg placeholder-gray-500
                text-m sm:text-l lg:text-xl w-full sm:w-2/3 focus:outline-none focus:ring" 
                placeholder="Search for something..."/>
                <button type="submit" className="self-center bg-blue-500 p-3 rounded-md
                text-m sm:text-l lg:text-xl font-bold text-white shadow-lg w-full sm:w-1/3 focus:outline-none focus:ring">Get Started</button>
            </div>
        </form>
    )
}