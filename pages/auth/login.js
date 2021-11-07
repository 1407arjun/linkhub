import Link from "next/link"
import Head from "../../components/uni/head"
import Footer from "../../components/uni/footer"

export default function Login() {
    return (
        <div className="text-center">
            <Head title="Login &middot; LinkHub"/>
            <div className="inline-flex flex-col place-content-center gap-4 w-full md:w-2/3 lg:w-1/2 p-6">
                <img src="/assets/logo-black.svg" alt="LinkHub" className="w-1/2 mx-auto"/>
                <h2 className="w-full font-bold text-2xl md:text-3xl text-center">Login</h2>
                <form action="/auth/login" method="POST" className="inline-flex flex-col mx-auto gap-4 justify-start items-center w-full md:w-2/3 lg:w-1/2 p-1">
                    <div className="w-full">
                        <label htmlFor="username" className="block text-left font-semibold mb-1">Username or Email</label>
                        <input name="username" type="text" placeholder="Username or Email" className="mt-1 w-full p-2 focus:outline-none rounded-md ring-1 ring-gray-300 focus:ring-gray-500"/>
                    </div>
                    <div className="w-full">
                        <label htmlFor="password" className="block text-left font-semibold mb-1">Password</label>
                        <input name="password" type="password" placeholder="Password" className="mt-1 w-full p-2 focus:outline-none rounded-md ring-1 ring-gray-300 focus:ring-gray-500"/>
                    </div>    
                    <button type="submit" className="w-full bg-blue-500 py-2 rounded-md font-bold text-white hover:bg-blue-600 focus:bg-blue-600">Login</button>
                    <div className="w-full flex flex-col justify-start items-start text-left">
                        <a className="text-left text-blue-500 hover:underline focus:underline">Forgot Password</a>
                        <Link href="/signup"><a className="text-left text-blue-500 hover:underline focus:underline">Sign up</a></Link>
                    </div>
                </form>
            </div>
            <Footer signedin={ false }/>
        </div>
    )
}