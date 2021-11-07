export default function TagBar(props) {
    return (
        <a className="flex-none px-1.5 py-0.5 text-xs text-gray-900 sm:text-sm rounded-full border border-gray-300 font-semibold hover:bg-gray-100 focus:bg-gray-100">{ props.name }</a>
    )
}