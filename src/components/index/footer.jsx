import Link from 'next/link'

export default function Footer() {
    return (
        <footer className="w-full text-center px-8">
            <div className="flex flex-row flex-wrap gap-2 justify-evenly items-center border-t border-white p-4">
                <p className="text-white font-semibold">&copy; 2021 LinkHub</p>
                <button onClick={ () => alert("Coming soon") } className="text-white hover:underline focus:underline">API</button>
                <Link href="https://github.com/1407arjun/linkhub"><a className="text-white hover:underline focus:underline">Developers</a></Link>
                <button onClick={ () => alert("Coming soon") } className="text-white hover:underline focus:underline">Twitter</button>
                <button onClick={ () => alert("Page under construction") } className="text-white hover:underline focus:underline">About</button>
                <button onClick={ () => alert("Page under construction") } className="text-white hover:underline focus:underline">Contact Us</button>
            </div>
        </footer>
    )
}