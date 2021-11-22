import Bar from './bar'
import HBar from './hbar'
import TagBar from './tagbar'
import Dropdown from './dropdown'

function getInitials(name) {
    let array = name.split(" ")
    if (array.length > 1) {
        return array[0].slice(0, 1).toUpperCase() + array[1].slice(0, 1).toUpperCase()
    } else {
        if (array[0].length > 1)
            return array[0].slice(0, 2).toUpperCase()
        else
        return (array[0].slice(0, 1).toUpperCase() + "0")
    }
}

export default function PostMini(props) {
    return (
        <div className="flex flex-col gap-1 place-content-start rounded-xl border border-gray-300 dark:border-gray-600 w-full p-2">
            <div className="flex flex-row flex-nowrap justify-between items-center gap-2 xl:gap-3 px-2 w-full">
                <div className="flex-none flex flex-row justify-start items-center gap-2 xl:gap-3">
                    <h3 className="p-2 select-none self-center inline-block font-bold text-lg sm:text-xl xl:text-2xl text-white dark:text-black rounded-full bg-black dark:bg-white text-center">{ getInitials(props.name) }</h3>
                    <div className="self-center flex flex-col justify-center items-start">
                    <a className="hover:no-underline focus:no-underline"><h4 className="text-sm xl:text-base font-semibold hover:underline focus:underline dark:text-white">{ props.name }</h4></a>
                        <p className="text-gray-500 dark:text-gray-300 text-xs xl:text-sm">{ "@" + props.username }</p>
                    </div>
                </div>
                <Dropdown delete={ true } saved={ true }/>
            </div>
            <div className="flex flex-row gap-2 place-content-start w-full px-2 sm:px-0">
                <Bar upvotes={ props.upvotes } downvotes={ props.downvotes } flags={ props.flags }/>
                <div className="flex flex-col gap-1 place-content-start w-full sm:w-5/6 py-2">
                    <h2 className="font-bold text-lg xl:text-xl dark:text-white">{ props.title }</h2>
                    <div className="dark:text-white">{ props.body }</div>
                    <div className="flex flex-row flex-wrap gap-2 justify-start items-center pt-2 pb-3">
                        {/* flex-nowrap overflow-x-auto md:flex-wrap md:overflow-visible */}
                        <TagBar name="app-development"/>
                        <TagBar name="app-development"/>
                        <TagBar name="app-development"/>
                    </div>
                </div>
            </div>
            <HBar upvotes={ props.upvotes } downvotes={ props.downvotes } flags={ props.flags }/>
        </div>
    )
}