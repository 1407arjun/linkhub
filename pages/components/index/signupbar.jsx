export default function SignUpBar() {
    return (
        <form action="/signup" method="POST" className="mt-4 md:mt-8">
            <div className="flex flex-col sm:flex-row justify-items-strech sm:justify-items-start gap-y-2 sm:gap-x-2 sm:mx-auto">
                <input type="text" className="self-center rounded-md bg-white px-4 py-3 shadow-lg placeholder-gray-500
                text-m sm:text-l lg:text-xl w-full sm:w-3/5 focus:outline-none focus:ring focus:ring-gray-500 focus:ring-opacity-60" 
                placeholder="Email address"/>
                <button type="submit" className="self-center bg-blue-500 px-2 py-3 rounded-md
                text-m sm:text-l lg:text-xl font-bold text-white shadow-lg w-full sm:w-2/5 focus:outline-none focus:ring focus:ring-opacity-60">Sign up for LinkHub</button>
            </div>
        </form>
    )
}