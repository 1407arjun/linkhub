import Head from '../components/uni/head'
import Footer from '../components/uni/footer'
import NavBar from '../components/uni/navbar'
import SideBar from '../components/profile/sidebar'
import SearchBar from '../components/uni/searchbar'

export default function Profile() {
    return (
        <div>
            <Head title="Profile &middot; LinkHub"/>
            <div className="flex flex-row place-content-start">
                <NavBar current="Profile"/>
                <div className="flex flex-col gap-4 justify-start items-center w-full md:w-5/6 lg:w-7/12 xl:w-3/6 p-4">
                    <SearchBar placeholder="What would you like to learn today?"/>
                    <div className="flex flex-col justify-center items-start w-full px-2 sm:px-4 gap-2 sm:gap-4">
                        
                    </div>
                </div>
                <SideBar/>
            </div>
            <Footer signedin={ true }/>
        </div>
    )
}