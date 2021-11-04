export default function Save(props) {
    return (
        <a href={ props.href }><div className="flex flex-row flex-nowrap justify-between items-center gap-2 xl:gap-3 p-2 rounded-xl hover:bg-gray-200 focus:bg-gray-200">
            <div className="flex-none flex flex-row justify-start items-center gap-2 xl:gap-3">
                <div className="self-center p-2 xl:p-3 rounded-full bg-black">
                    <img src="/assets/home/bookmark-white.svg" className="w-3 xl:w-6 mx-auto" alt=""/>
                </div>
                <div className="self-center flex flex-col justify-center items-start">
                    <h4 className="text-sm xl:text-base font-semibold">{ props.name }</h4>
                    <p className="text-gray-500 text-xs xl:text-sm">{ props.tag }</p>
                </div>
                </div>
            <button className="flex-none self-center justify-self-end bg-white rounded-full"><img src="/assets/home/delete-sq.svg" className="w-6 xl:w-8" alt="Add"/></button>
        </div></a>
    )
} 