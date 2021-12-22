import Link from 'next/link'
import axios from 'axios'
import nprogress from 'nprogress'

export default function Recent(props) {
    async function addToSaved() {
        nprogress.start()
        try {
            const r = await axios.post("/api/saved/update", { postId: props.id, remove: false })
            if (r.status === 200)
                props.update(props.id)
        } catch (e) {
            console.log(e)
        } finally {
            nprogress.done()
        }
    }

    return (
        <div className="flex flex-row flex-nowrap justify-between items-center gap-2 xl:gap-3 p-2 rounded-xl hover:bg-gray-200 focus:bg-gray-200 dark:hover:bg-gray-700 dark:focus:bg-gray-700">
            <Link href={ "/post/" + props.id }><a className="hover:no-underline focus:no-underline"><div className="flex-none flex flex-row justify-start items-center gap-2 xl:gap-3">
                <div className="self-center p-2 xl:p-3 rounded-full bg-black dark:bg-white">
                    <img src="/assets/posts/link-45.svg" className="w-3 xl:w-6 mx-auto dark:filter dark:invert" alt=""/>
                </div>
                <div className="self-center flex flex-col justify-center items-start">
                    <h4 className="text-sm xl:text-base font-semibold dark:text-white">{ props.title.length > 25 ? props.title.slice(0, 25) + "..." : props.title }</h4>
                    <p className="text-gray-500 dark:text-gray-300 text-xs xl:text-sm">{ props.desc }</p>
                </div>
            </div></a></Link>
            <button onClick={ () => addToSaved() } className="flex-none self-center justify-self-end bg-white dark:bg-black rounded-full">
                <img src="/assets/home/plus-sq.svg" className="w-6 xl:w-8" alt="Add"/>
            </button>
        </div>
    )
} 