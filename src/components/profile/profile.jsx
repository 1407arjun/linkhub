export default function Profile(props) {
    return (
        <a href={ props.href } className="hover:no-underline focus:no-underline"> {/* Max tag length == 25*/}
            <div className="flex flex-row flex-nowrap justify-between items-center gap-2 xl:gap-3 p-2 rounded-xl hover:bg-gray-200 focus:bg-gray-200 dark:hover:bg-gray-700 dark:focus:bg-gray-700">
                <div className="flex-none flex flex-row justify-start items-center gap-2 xl:gap-3">
                    <div className="self-center p-2 xl:p-3 rounded-full bg-black dark:bg-white">
                        <img src="/assets/profile/person.svg" className="w-3 xl:w-6 mx-auto dark:filter dark:invert" alt=""/>
                    </div>
                    <div className="self-center flex flex-col justify-center items-start">
                        <h4 className="text-sm xl:text-base font-semibold dark:text-white">{ props.name.length > 25 ? props.name.slice(0, 25) + "..." : props.name }</h4>
                        <p className="text-gray-500 dark:text-gray-300 text-xs xl:text-sm">{ "@" + props.username }</p>
                    </div>
                </div>
            </div>
        </a>
    )
} 