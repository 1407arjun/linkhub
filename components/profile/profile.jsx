export default function Profile(props) {
    return (
        <a href={ props.href }> {/* Max tag length == 25*/}
            <div className="flex flex-row flex-nowrap justify-between items-center gap-2 xl:gap-3 p-2 rounded-xl hover:bg-gray-200 focus:bg-gray-200">
                <div className="flex-none flex flex-row justify-start items-center gap-2 xl:gap-3">
                    <div className="self-center p-2 xl:p-3 rounded-full bg-black">
                        <img src="/assets/profile/person.svg" className="w-3 xl:w-6 mx-auto" alt=""/>
                    </div>
                    <div className="self-center flex flex-col justify-center items-start">
                        <h4 className="text-sm xl:text-base font-semibold">{ props.name.length > 25 ? props.name.slice(0, 25) + "..." : props.name }</h4>
                        <p className="text-gray-500 text-xs xl:text-sm">{ "@" + props.username }</p>
                    </div>
                </div>
            </div>
        </a>
    )
} 