import Bar from './bar'
import HBar from './hbar'


function getInitials(name) {
    let array = name.split(" ")
    if (array.length > 1) {
        return array[0].slice(0, 1).toUpperCase() + array[1].slice(0, 1).toUpperCase()
    } else {
        return array[0].slice(0, 1).toUpperCase()
    }
}

export default function PostMini(props) {
    return (
        <div className="flex flex-col gap-1 place-content-start rounded-xl border border-gray-300 w-full p-2">
            <a>
                <div className="flex flex-row flex-nowrap justify-between items-center gap-2 xl:gap-3 px-2 w-full">
                    <div className="flex-none flex flex-row justify-start items-center gap-2 xl:gap-3">
                        <div className="self-center w-9 h-9 sm:w-10 sm:h-10 xl:w-11 xl:h-11 rounded-full bg-black text-center">
                            <h3 className="font-bold text-lg sm:text-xl xl:text-2xl text-white my-0.5 lg:my-1 h-full">{ getInitials(props.name) }</h3>
                        </div>
                        <div className="self-center flex flex-col justify-center items-start">
                            <h4 className="text-sm xl:text-base font-semibold">{ props.name }</h4>
                            <p className="text-gray-500 text-xs xl:text-sm">{ "@" + props.username }</p>
                        </div>
                    </div>
                </div>
            </a>
            <div className="flex flex-row gap-2 place-content-start w-full px-2 sm:px-0">
                <Bar upvotes={ props.upvotes } downvotes={ props.downvotes } flags={ props.flags }/>
                <div className="flex flex-col gap-1 place-content-start w-full sm:w-5/6 py-2">
                    <h2 className="font-bold text-lg xl:text-xl">{ props.title }</h2>
                    <p>{ props.body }</p>
                </div>
            </div>
            <HBar/>
        </div>
    )
}