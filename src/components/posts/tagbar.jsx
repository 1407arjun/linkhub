export default function TagBar(props) {
    return (
        <a className="flex-none px-1.5 py-0.5 text-xs text-gray-900 dark:text-gray-100 sm:text-sm rounded-full border border-gray-300 dark:border-gray-600 font-semibold hover:bg-gray-100 focus:bg-gray-100 dark:hover:bg-gray-800 dark:focus:bg-gray-800">{ props.name }</a>
    )
}