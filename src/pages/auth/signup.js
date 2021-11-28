import Link from "next/link"
import Head from "../../components/uni/head"
import Footer from "../../components/uni/footer"
import { getSession } from "next-auth/react"

export default function SignUp() {
    return (
        <div className="text-center dark:bg-black">
            <Head title="Sign up &middot; LinkHub"/>
            <div className="inline-flex flex-col place-content-center gap-4 w-full md:w-4/5 xl:w-1/2 p-6 min-h-screen">
                <img src="/assets/logo-black.svg" alt="LinkHub" className="w-1/2 mx-auto dark:filter dark:invert"/>
                <h2 className="w-full font-bold text-2xl md:text-3xl text-center dark:text-white">Sign up</h2>
                <form action="/api/auth/local/signup" method="POST" className="inline-flex flex-col md:grid md:grid-cols-2 mx-auto gap-4 justify-start items-center w-full p-1">
                    <div className="w-full self-start">
                        <label htmlFor="name" className="block text-left font-semibold mb-1 dark:text-white">Full Name</label>
                        <input name="name" type="text" placeholder="Full Name" className="dark:bg-black mt-1 w-full p-2 focus:outline-none rounded-md ring-1 ring-gray-300 focus:ring-gray-500 dark:text-white dark:focus:ring-gray-100" pattern="[a-zA-Z0-9_\- ]+" required minLength="2" maxLength="20"/>
                        <p className="px-1 py-0.5 text-left text-gray-500 dark:text-gray-300 text-xs md:text-sm">Special characters except hyphens ( - ) and underscores ( _ ) are not allowed</p>
                    </div>
                    <div className="w-full self-start">
                        <label htmlFor="email" className="block text-left font-semibold mb-1 dark:text-white">Email</label>
                        <input name="email" type="email" placeholder="Email" className="dark:bg-black mt-1 w-full p-2 focus:outline-none rounded-md ring-1 focus:ring-2 ring-gray-300 focus:ring-gray-500 dark:text-white dark:focus:ring-gray-100" required/>
                    </div>
                    <div className="w-full self-start">
                        <label htmlFor="password" className="block text-left font-semibold mb-1 dark:text-white">Password</label>
                        <input name="password" type="password" placeholder="Password" className="dark:bg-black mt-1 w-full p-2 focus:outline-none rounded-md ring-1 focus:ring-2 ring-gray-300 focus:ring-gray-500 dark:text-white dark:focus:ring-gray-100" required minLength="6"/>
                        <p className="px-1 py-0.5 text-left text-gray-500 dark:text-gray-300 text-xs md:text-sm">Should contain at least one uppercase letter ( A-Z ), numbers ( 0-9 ) and a special character</p>
                    </div> 
                    <div className="w-full self-start">
                        <label htmlFor="cpassword" className="block text-left font-semibold mb-1 dark:text-white">Confirm password</label>
                        <input name="cpassword" type="password" placeholder="Confirm password" className="dark:bg-black mt-1 w-full p-2 focus:outline-none rounded-md ring-1 focus:ring-2 ring-gray-300 focus:ring-gray-500 dark:text-white dark:focus:ring-gray-100" required/>
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