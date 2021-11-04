import Head from '../components/uni/head'
import Footer from '../components/uni/footer'
import NavBar from '../components/home/navbar'
import SideBar from '../components/home/sidebar'
import SearchBar from '../components/home/searchbar'

export default function Home() {
    return (
        <div>
            <Head title="LinkHub &middot; Home"/>
            <div className="flex flex-row place-content-start">
                <NavBar current="Home"/>
                <div className="flex flex-col justify-start items-center w-full md:w-5/6 lg:w-7/12 xl:w-3/6 p-4">
                    <SearchBar/>
                </div>
                <SideBar/>
            </div>
            <Footer/>
        </div>
    )
}