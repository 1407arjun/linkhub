import Link from 'next/link'
import Head from '../components/uni/head'
import Footer from '../components/uni/footer'
import NavBar from '../components/uni/navbar'
import SearchBar from '../components/uni/searchbar'
import Tag from '../components/home/tag'
import Recent from '../components/posts/recent'
import Profile from '../components/profile/profile'

export default function Explore() {
    return (
        <div>
            <Head title="Explore &middot; LinkHub"/>
            <div className="flex flex-row place-content-start">
                <NavBar current="Explore"/>
                <div className="flex flex-col gap-4 justify-start items-center w-full md:w-5/6 lg:w-11/12 xl:w-5/6 p-4">
                    <SearchBar placeholder="What would you like to learn today?"/>
                    <p className="w-full text-left px-2 sm:px-4 text-xs sm:text-sm md:text-base xl:text-lg">Found <Link href="/explore"><a><span className="font-semibold underline">10 posts</span></a></Link>, <Link href="/explore"><a><span className="font-semibold underline">5 tags</span></a></Link> and <Link href="/explore"><a><span className="font-semibold underline">2 users</span></a></Link>.</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-center items-start w-full px-2 sm:px-4 gap-2 sm:gap-4">
                        <Tag name="app-development" follow="8.2K"/>
                        <Tag name="web-development" follow="15K"/>
                        <Tag name="machine-learning" follow="5K"/>
                        <Profile name="Arjun Sivaraman" username="1407arjun"/>
                    </div>
                    <p className="text-sm md:text-base italic">-- You have reached the end --</p>
                </div>
            </div>
            <Footer signedin={ true }/>
        </div>
    )
}