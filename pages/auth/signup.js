import Link from "next/link"
import Head from "../../components/uni/head"
import Footer from "../../components/uni/footer"

export default function SignUp() {
    return (
        <div className="text-center dark:bg-black">
            <Head title="Sign up &middot; LinkHub"/>
            <div className="inline-flex flex-col place-content-center gap-4 w-full md:w-4/5 xl:w-1/2 p-6">
                <img src="/assets/logo-black.svg" alt="LinkHub" className="w-1/2 mx-auto"/>
                <h2 className="w-full font-bold text-2xl md:text-3xl text-center dark:text-white">Sign up</h2>
                <form action="/auth/signup" method="POST" className="inline-flex flex-col md:grid md:grid-cols-2 mx-auto gap-4 justify-start items-center w-full p-1">
                    <div className="w-full">
                        <label htmlFor="name" className="block text-left font-semibold mb-1 dark:text-white">Name</label>
                        <input name="name" type="text" placeholder="Name" className="dark:bg-black mt-1 w-full p-2 focus:outline-none rounded-md ring-1 ring-gray-300 focus:ring-gray-500 dark:text-white dark:focus:ring-gray-100"/>
                    </div>
                    <div className="w-full">
                        <label htmlFor="username" className="block text-left font-semibold mb-1 dark:text-white">Username</label>
                        <input name="username" type="text" placeholder="Username" className="dark:bg-black mt-1 w-full p-2 focus:outline-none rounded-md ring-1 focus:ring-2 ring-gray-300 focus:ring-gray-500 dark:text-white dark:focus:ring-gray-100"/>
                    </div>
                    <div className="w-full">
                        <label htmlFor="email" className="block text-left font-semibold mb-1 dark:text-white">Email</label>
                        <input name="email" type="email" placeholder="Email" className="dark:bg-black mt-1 w-full p-2 focus:outline-none rounded-md ring-1 focus:ring-2 ring-gray-300 focus:ring-gray-500 dark:text-white dark:focus:ring-gray-100"/>
                    </div>
                    <div className="w-full">
                        <label htmlFor="dob" className="block text-left font-semibold mb-1 dark:text-white">Date of Birth</label>
                        <input name="dob" type="date" placeholder="Date of Birth" className="dark:bg-black mt-1 w-full p-2 focus:outline-none rounded-md ring-1 focus:ring-2 ring-gray-300 focus:ring-gray-500 dark:text-white dark:focus:ring-gray-100"/>
                    </div>
                    <div className="w-full">
                        <label htmlFor="password" className="block text-left font-semibold mb-1 dark:text-white">Password</label>
                        <input name="password" type="password" placeholder="Password" className="dark:bg-black mt-1 w-full p-2 focus:outline-none rounded-md ring-1 focus:ring-2 ring-gray-300 focus:ring-gray-500 dark:text-white dark:focus:ring-gray-100"/>
                    </div> 
                    <div className="w-full">
                        <label htmlFor="cpassword" className="block text-left font-semibold mb-1 dark:text-white">Confirm password</label>
                        <input name="cpassword" type="password" placeholder="Confirm password" className="dark:bg-black mt-1 w-full p-2 focus:outline-none rounded-md ring-1 focus:ring-2 ring-gray-300 focus:ring-gray-500 dark:text-white dark:focus:ring-gray-100"/>
                    </div>
                    <div className="w-full md:col-span-2">  
                        <button type="submit" className="w-full md:w-1/2 bg-blue-500 py-2 rounded-md font-bold text-white hover:bg-blue-600 focus:bg-blue-600">Sign up</button>
                    </div>
                    <div className="w-full md:col-span-2">
                        <Link href="/login"><a className="text-center text-blue-500 hover:underline focus:underline">Sign in</a></Link>
                    </div>
                </form>
            </div>
            <Footer signedin={ false }/>
        </div>
    )
}