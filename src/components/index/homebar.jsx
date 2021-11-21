import Link from 'next/link'
import SearchBar from '../index/searchbar'

export default function HomeBar() {
    return (
        <header>
            <div className="flex flex-row px-2 sm:px-4 pt-5 pb-1 mx-4 justify-around">
                <img src="/assets/logo.svg" className="w-1/4 md:w-1/6 lg:w-1/8 xl:w-1/10 mr-2" alt="LinkHub"/>
                <div className="hidden md:inline-flex flex-row flex-auto justify-start content-center mx-2">
                    <a className="text-lg text-white border-transparent hover:border-b-white border-4 px-2 py-1.5 hover:no-underline focus:no-underline">About</a>
                </div>
                <div className="inline-flex flex-row-reverse flex-auto justify-start content-center ml-2">
                    <button className="inline md:hidden ml-1 w-10"><img src="/assets/index/menu.svg" className="w-full" alt="Nav"/></button>
                    <Link href="/signup"><a className="self-center mx-1 md:ml-2 text-lg text-white rounded-md border border-white px-2 py-1.5 hover:no-underline focus:no-underline">Sign Up</a></Link>
                    <Link href="/login"><a className="self-center mx-1 md:mx-2 text-lg text-white rounded-md border border-transparent px-2 py-1.5 hover:no-underline focus:no-underline">Sign In</a></Link>
                    <SearchBar/>
                </div>
            </div>
        </header> 
    )
}