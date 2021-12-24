import Link from 'next/link'
import { signOut } from 'next-auth/react'

export default function Footer(props) {
    return (
        <footer className="w-full text-center bg-gray-200 dark:bg-gray-800 py-2">
            { props.signedin && <p className="block text-gray-600 dark:text-gray-200 mb-2 text-sm"><span className="font-semibold">{ "Signed in as " + props.username + "." }</span> Not you? <span>
                <button className="hover:underline focus:underline" onClick={ () => signOut() }>Sign out</button></span>
            </p> }
            <div className="flex flex-row flex-wrap gap-2 justify-evenly items-center mt-1 px-8">
                <p className="text-black dark:text-white font-semibold">&copy; 2021 LinkHub</p>
                <button onClick={ () => alert("Coming soon") } className="text-gray-600 dark:text-gray-200 hover:underline focus:underline">API</button>
                <Link href="https://github.com/1407arjun/linkhub"><a className="text-gray-600 dark:text-gray-200 hover:underline focus:underline">Developers</a></Link>
                <Link href="https://twitter.com/LinkHub_Org"><a className="text-gray-600 dark:text-gray-200 hover:underline focus:underline">Twitter</a></Link>
                <button onClick={ () => alert("Page under construction") } className="text-gray-600 dark:text-gray-200 hover:underline focus:underline">About</button>
                <button onClick={ () => alert("Page under construction") } className="text-gray-600 dark:text-gray-200 hover:underline focus:underline">Contact Us</button>
            </div>
        </footer>
    )
}