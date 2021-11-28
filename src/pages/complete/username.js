import Head from "../../components/uni/head"
import Footer from "../../components/uni/footer"
import { getSession } from "next-auth/react"
import client from '../../server/loaders/database'

export default function Username() {

    async function check(ev) {
        ev.preventDefault()
        console.log(ev)
        const res = await fetch("/api/new?reqname=" + ev.target[0].value)
        if (res.exists)
            alert("Username already exists.")
        else {
            fetch("/api/new", {
                method: "POST",
                body: JSON.stringify({ username: ev.target[0].value })
            }) 
        }
    }

    return (
        <div className="text-center dark:bg-black">
            <Head title="Complete your profile &middot; LinkHub"/>
            <div className="inline-flex flex-col place-content-center gap-4 w-full md:w-2/3 lg:w-1/2 p-6 min-h-screen">
                <img src="/assets/logo-black.svg" alt="LinkHub" className="w-1/2 mx-auto dark:filter dark:invert"/>
                <h2 className="w-full font-bold text-2xl md:text-3xl text-center dark:text-white">Complete your profile</h2>
                <form className="inline-flex flex-col mx-auto gap-4 justify-start items-center w-full md:w-2/3 p-1">
                    <div className="w-full self-start">
                        <label htmlFor="username" className="block text-left font-semibold mb-1 dark:text-white">Enter a username for your account (You can always change it later)</label>
                        <input name="username" type="text" placeholder="Username" className="dark:bg-black mt-1 w-full p-2 focus:outline-none rounded-md ring-1 focus:ring-2 ring-gray-300 focus:ring-gray-500 dark:text-white dark:focus:ring-gray-100" pattern="[a-z0-9_]+" autoComplete="off" required minLength="4" maxLength="20"/>
                        <p className="px-1 py-0.5 text-left text-gray-500 dark:text-gray-300 text-xs md:text-sm">Only lowercase alphabets ( a-z ), numbers ( 0-9 ) and underscores ( _ ) are allowed</p>
                    </div>    
                    <button type="submit" className="w-full bg-blue-500 py-2 rounded-md font-bold text-white hover:bg-blue-600 focus:bg-blue-600">Let&#39;s Go!</button>
                </form>
            </div>
            <Footer signedin={ true }/>
        </div>
    )  
}

export async function getServerSideProps(context) {
    const session = await getSession(context)
    if (!session) {
        return {
            redirect: {
            destination: "/login"
            },
            props: {}
        }
    } else {
        const mClient = await client
        const profile = await mClient.db("Client").collection("profiles").findOne({"user.email": session.user.email})
        //await mClient.close()
        if (profile)
            return {
                redirect: {
                destination: "/home"
                },
                props: {}
            }
        else
            return { props: {} }       
    }
}