export default function Tag(props) {
    return (
        <div className="pl-1.5 gap-1 flex-none flex flex-row rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-100 focus:bg-gray-100 dark:hover:bg-gray-800 dark:focus:bg-gray-800">
            <p className="flex-none text-base md:text-lg text-gray-900 dark:text-gray-100 font-semibold">{ props.name }</p>
            <button onClick={ () => { props.update((prev) => { return prev.filter(tag => { return tag !== props.name }) }) } } className="flex-none rounded-full p-1 bg-gray-300 dark:bg-gray-600 border border-gray-300 dark:border-gray-600"><img src="/assets/home/cancel.svg" className="dark:filter dark:invert w-2 sm:w-4" alt="Remove"/></button>
        </div>
    )     
}