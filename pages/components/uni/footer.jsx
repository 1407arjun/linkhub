export default function Footer() {
    return (
        <footer className="w-full text-center p-4">
            <div className="flex flex-row flex-wrap gap-2 justify-evenly items-center border-t border-white py-2">
                <p className="text-white">&copy; 2021 LinkHub</p>
                <a href="/docs/api" className="text-white hover:underline">API</a>
                <a href="https://github.com/linkhub-org" className="text-white hover:underline">Developers</a>
                <img src="/assets/icon.svg" className="hidden lg:inline object-contain flex-initial w-10"/>
                <a href="https://twitter.com/LinkHub_Org" className="text-white hover:underline">Twitter</a>
                <a className="text-white hover:underline">About</a>
                <a className="text-white hover:underline">Contact Us</a>
            </div>
        </footer>
    )
}