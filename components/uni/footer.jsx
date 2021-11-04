import Link from 'next/link'

export default function Footer() {
    return (
        <footer className="w-full text-center bg-gray-200">
            <div className="flex flex-row flex-wrap gap-2 justify-evenly items-center px-8 py-4">
                <p className="text-black font-semibold">&copy; 2021 LinkHub</p>
                <a className="text-blue-700 hover:underline focus:underline">API</a>
                <Link href="https://github.com/linkhub-org"><a className="text-blue-700 hover:underline focus:underline">Developers</a></Link>
                <Link href="https://twitter.com/LinkHub_Org"><a className="text-blue-700 hover:underline focus:underline">Twitter</a></Link>
                <a className="text-blue-700 hover:underline focus:underline">About</a>
                <a className="text-blue-700 hover:underline focus:underline">Contact Us</a>
            </div>
        </footer>
    )
}