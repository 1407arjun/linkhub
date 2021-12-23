import Link from 'next/link'

export default function Profile(props) {
    return (
        <Link href={ "/profile/" + props.username }><a className="hover:no-underline focus:no-underline w-full">
            <div className="flex flex-row flex-nowrap justify-between items-center gap-2 xl:gap-3 p-2 rounded-xl hover:bg-gray-200 focus:bg-gray-200 dark:hover:bg-gray-700 dark:focus:bg-gray-700">
                <div className="flex-none flex flex-row justify-start items-center gap-2 xl:gap-3">
                    <div className={ "self-center rounded-full" + (props.image ? "" : " p-2 xl:p-3 bg-black dark:bg-white") }>
                        <img src={ props.image ? props.image : "/assets/profile/person.svg" } className={ "mx-auto" + (props.image ? " w-8 md:w-10 rounded-full" : " w-3 md:w-6 dark:filter dark:invert") } alt=""/>
                    </div>
                    <div className="self-center flex flex-col justify-center items-start">
                        <h4 className="text-sm xl:text-base font-semibold dark:text-white">{ props.name.length > 25 ? props.name.slice(0, 25) + "..." : props.name }</h4>
                        <p className="text-gray-500 dark:text-gray-300 text-xs xl:text-sm">{ "@" + props.username }</p>
                    </div>
                </div>
            </div>
        </a></Link>
    )
} 