export default function Footer() {
    return (
        <footer className="w-full text-center px-8">
            <div className="flex flex-row flex-wrap gap-2 justify-evenly items-center border-t border-black pt-4 pb-1">
                <p className="text-black font-semibold">&copy; 2021 LinkHub</p>
                <a href="/docs/api" className="text-blue-700 hover:underline focus:underline">API</a>
                <a href="https://github.com/linkhub-org" className="text-blue-700 hover:underline focus:underline">Developers</a>
                <a href="https://twitter.com/LinkHub_Org" className="text-blue-700 hover:underline focus:underline">Twitter</a>
                <a className="text-blue-700 hover:underline focus:underline">About</a>
                <a className="text-blue-700 hover:underline focus:underline">Contact Us</a>
            </div>
        </footer>
    )
}