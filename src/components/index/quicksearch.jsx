import { useRouter } from "next/router"

export default function QuickSearch() {
    const router = useRouter()

    async function postQuery(ev) {
        ev.preventDefault()
        router.push("/explore?query=" + ev.target[0].value)
    }

    return (
        <form onSubmit={ postQuery } className="mt-4 md:mt-8">
            <div className="flex flex-col md:flex-row justify-items-strech md:justify-items-start gap-y-2 md:gap-x-2 md:mx-auto">
                <input type="text" className="self-center rounded-md bg-white bg-opacity-20 backdrop-blur-sm px-4 py-3 shadow-lg placeholder-gray-100
                text-base sm:text-lg lg:text-xl text-white w-full md:w-2/3 lg:w-2/3 focus:outline-none ring-1 ring-white ring-opacity-60 focus:ring-opacity-100" 
                placeholder="Quick search..." autoComplete="off"/>
                <button type="submit" className="self-center bg-blue-600 px-2 md:px-1 xl:px-2 py-3 rounded-md
                text-base sm:text-lg lg:text-xl font-bold text-white shadow-lg w-full md:w-1/3 lg:w-1/3 focus:outline-none focus:ring focus:ring-opacity-60">Get started</button>
            </div>
        </form>
    )
}
