import Head from '../components/uni/head'
import Footer from '../components/uni/footer'
import NavBar from '../components/home/navbar'
import SideBar from '../components/home/sidebar'
import SearchBar from '../components/home/searchbar'
import PostMini from '../components/posts/post-mini'

export default function Home() {
    return (
        <div>
            <Head title="LinkHub &middot; Home"/>
            <div className="flex flex-row place-content-start">
                <NavBar current="Home"/>
                <div className="flex flex-col gap-4 justify-start items-center w-full md:w-5/6 lg:w-7/12 xl:w-3/6 p-4">
                    <SearchBar/>
                    <div className="flex flex-col justify-center items-start w-full p-4 gap-4">
                        <PostMini/>
                        <PostMini/>
                    </div>
                </div>
                <SideBar/>
            </div>
            <Footer/>
        </div>
    )
}