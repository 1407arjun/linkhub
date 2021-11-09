function getInitials(name) {
    let array = name.split(" ")
    if (array.length > 1) {
        return array[0].slice(0, 1).toUpperCase() + array[1].slice(0, 1).toUpperCase()
    } else {
        return array[0].slice(0, 2).toUpperCase()
    }
}

export default function SearchBar(props) {
    return (
        <div className="flex flex-row flex-nowrap justify-start items-center gap-4 w-full py-1">
            <input type="text" className="inline self-center rounded-md bg-gray-300 dark:bg-gray-500 bg-opacity-20 dark:bg-opacity-20 filter backdrop-blur-sm placeholder-gray-500 dark:placeholder-gray-300
                    text-sm sm:text-base md:text-lg xl:text-xl p-3 focus:outline-none text-black dark:text-white ring-1 focus:ring-2 ring-gray-300 focus:ring-gray-500 dark:focus:ring-gray-100 ring-opacity-100 focus:ring-opacity-40 w-full" 
                    placeholder={ props.placeholder }/>
            <button className="p-3 cursor-default self-center inline-block font-bold text-lg sm:text-xl xl:text-2xl text-white dark:text-black rounded-full bg-black dark:bg-white text-center">{ getInitials(props.user) }</button>        
        </div>    
    )
}