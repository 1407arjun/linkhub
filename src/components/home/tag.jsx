import Link from 'next/link'
import axios from 'axios'

export default function Tag(props) {
    async function addToTags() {
        try {
            const r = await axios.post("/api/tag/update", { tag: props.name, remove: false })
            if (r.status === 200)
                props.update(props.name)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className="flex flex-row flex-nowrap justify-between items-center gap-2 xl:gap-3 p-2 rounded-xl hover:bg-gray-200 focus:bg-gray-200 dark:hover:bg-gray-700 dark:focus:bg-gray-700">
            <Link href={ "/tag/" + props.name }><a className="hover:no-underline focus:no-underline"><div className="flex-none flex flex-row justify-start items-center gap-2 xl:gap-3">
                <div className="self-center p-2 xl:p-3 rounded-full bg-black dark:bg-white">
                    <img src="/assets/home/tag.svg" className="w-3 xl:w-6 mx-auto dark:filter dark:invert" alt=""/>
                </div>
                <div className="self-center flex flex-col justify-center items-start">
                    <h4 className="text-sm xl:text-base font-semibold dark:text-white">{ props.name }</h4>
                    <p className="text-gray-500 dark:text-gray-300 text-xs xl:text-sm">{ props.post + " posts"}</p>
                </div>
            </div></a></Link>
            <button onClick={ () => addToTags() } className="flex-none self-center justify-self-end bg-white dark:bg-black rounded-full">
                <img src="/assets/home/plus-sq.svg" className="w-6 xl:w-8" alt="Add"/>
            </button>
        </div>
    )
} 