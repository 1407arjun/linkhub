import Link from 'next/link'

export default function SignUpBar() {
    return (
        /*<form action="/signup" method="POST" className="mt-4 md:mt-8">
            <div className="flex flex-col md:flex-row justify-items-strech md:justify-items-start gap-y-2 md:gap-x-2 md:mx-auto">
                <input type="email" className="self-center rounded-md bg-white px-4 py-3 shadow-lg placeholder-gray-500
                text-base sm:text-lg lg:text-xl w-full md:w-2/3 lg:w-1/2 xl:w-3/5 focus:outline-none focus:ring focus:ring-gray-500 focus:ring-opacity-60" 
                placeholder="Email address"/>
                <button type="submit" className="self-center bg-blue-600 px-2 md:px-1 xl:px-2 py-3 rounded-md
                text-base sm:text-lg lg:text-xl font-bold text-white shadow-lg w-full md:w-1/3 lg:w-1/2 xl:w-2/5 focus:outline-none focus:ring focus:ring-opacity-60">Sign up for LinkHub</button>
            </div>
        </form>*/
        <Link href="/signup"><a type="submit" className="md:mx-auto lg:mx-0 mt-2 md:mt-6 bg-blue-600 px-2 md:px-1 xl:px-2 py-3 rounded-md hover:no-underline focus:no-underline text-center
                text-base sm:text-lg lg:text-xl font-bold text-white shadow-lg w-full md:w-1/3 lg:w-1/2 xl:w-2/5 focus:outline-none focus:ring focus:ring-opacity-60">Sign up for LinkHub</a></Link>
    )
}