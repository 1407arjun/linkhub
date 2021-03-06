import Link from "next/link"
import Head from "../../components/uni/head"
import Footer from "../../components/uni/footer"
import { getSession } from "next-auth/react"

export default function Login() {
    return (
        <div className="text-center dark:bg-black">
            <Head title="Login &middot; LinkHub" desc="Enter your details to login to LinkHub"/>
            <div className="inline-flex flex-col place-content-center gap-4 w-full md:w-2/3 lg:w-1/2 p-6 min-h-screen">
                <img src="/assets/logo-black.svg" alt="LinkHub" className="w-1/2 mx-auto dark:invert"/>
                <h2 className="w-full font-bold text-2xl md:text-3xl text-center dark:text-white">Login</h2>
                <form action="/api/auth/local/login" method="POST" className="inline-flex flex-col mx-auto gap-4 justify-start items-center w-full md:w-2/3 lg:w-1/2 p-1">
                    <div className="w-full">
                        <label htmlFor="username" className="block text-left font-semibold mb-1 dark:text-white">Username or Email</label>
                        <input name="username" type="text" placeholder="Username or Email" className="dark:bg-black mt-1 w-full p-2 focus:outline-none rounded-md ring-1 focus:ring-2 ring-gray-300 focus:ring-gray-500 dark:text-white dark:focus:ring-gray-100" pattern="[a-z0-9_\-@.]+" required/>
                    </div>
                    <div className="w-full">
                        <label htmlFor="password" className="block text-left font-semibold mb-1 dark:text-white">Password</label>
                        <input name="password" type="password" placeholder="Password" className="dark:bg-black mt-1 w-full p-2 focus:outline-none rounded-md ring-1 focus:ring-2 ring-gray-300 focus:ring-gray-500 dark:text-white dark:focus:ring-gray-100" required/>
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

export async function getServerSideProps(context) {
    const session = await getSession(context)
    if (session) {
        return {
          redirect: {
            destination: "/home"
          },
          props: {}
        }
    }
    return {props: {}}
  }