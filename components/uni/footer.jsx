import Link from 'next/link'

export default function Footer(props) {
    return (
        <footer className="w-full text-center bg-gray-200 py-2">
             <p className={ (props.signedin ? "block " : "hidden ") + "text-gray-600 mb-2 text-sm"}><span className="font-semibold">Signed in as 1407arjun.</span> Not you? <span>
                <Link href="/login?logout=true"><a className="hover:underline focus:underline">Sign out</a></Link></span>
            </p>
            <div className="flex flex-row flex-wrap gap-2 justify-evenly items-center mt-1 px-8">
                <p className="text-black font-semibold">&copy; 2021 LinkHub</p>
                <a className="text-gray-600 hover:underline focus:underline">API</a>
                <Link href="https://github.com/linkhub-org"><a className="text-gray-600 hover:underline focus:underline">Developers</a></Link>
                <Link href="https://twitter.com/LinkHub_Org"><a className="text-gray-600 hover:underline focus:underline">Twitter</a></Link>
                <a className="text-gray-600 hover:underline focus:underline">About</a>
                <a className="text-gray-600 hover:underline focus:underline">Contact Us</a>
            </div>
        </footer>
    )
}