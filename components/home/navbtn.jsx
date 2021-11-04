export default function NavBtn(props) {
    return (
        <button className={ (props.current ? "border-r-4 border-blue-500 " : "") + "md px-8 lg:px-10 py-4" }><img src={ props.src } className="w-6 lg:w-8" alt={ props.alt }/></button>
    )
} 