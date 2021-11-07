import Head from '../components/uni/head'
import Footer from '../components/uni/footer'
import NavBar from '../components/uni/navbar'
import SideBar from '../components/profile/sidebar'
import SearchBar from '../components/uni/searchbar'

export default function Profile() {
    return (
        <div>
            <Head title="Settings &middot; LinkHub"/>
            <div className="flex flex-row place-content-start">
                <NavBar current="Settings"/>
                <div className="flex flex-col gap-4 justify-start items-center w-full md:w-5/6 lg:w-7/12 xl:w-3/6 p-4">
                    <SearchBar placeholder="What would you like to learn today?"/>
                    <h2 className="w-full font-bold text-2xl md:text-3xl text-left">Profile Data</h2>
                    <form action="/settings" method="POST" className="flex flex-col gap-4 justify-start items-center w-full p-1">
                        <div className="w-full">
                            <label htmlFor="username" className="w-full font-semibold mb-1">Username:</label>
                            <input name="username" type="text" placeholder="Username" className="mt-1 w-full p-2 focus:outline-none rounded-md ring-1 ring-gray-300 focus:ring-gray-500"/>
                        </div>
                        <div className="w-full">
                            <label htmlFor="name" className="w-full font-semibold mb-1">Name:</label>
                            <input name="name" type="text" placeholder="Name" className="mt-1 w-full p-2 focus:outline-none rounded-md ring-1 ring-gray-300 focus:ring-gray-500"/>
                        </div>
                        <div className="w-full">
                            <label htmlFor="email" className="w-full font-semibold mb-1">Email:</label>
                            <input name="email" type="text" placeholder="Email" className="mt-1 w-full p-2 focus:outline-none rounded-md ring-1 ring-gray-300 focus:ring-gray-500"/>
                        </div>
                        <div className="w-full">
                            <label htmlFor="dob" className="w-full font-semibold mb-1">Date of Birth:</label>
                            <input name="dob" type="date" placeholder="Date of Birth" className="mt-1 w-full p-2 focus:outline-none rounded-md ring-1 ring-gray-300 focus:ring-gray-500"/>
                        </div>
                        <div className="w-full grid grid-rows-3 sm:grid-cols-3 gap-4">
                            <button type="submit" className="bg-blue-500 py-2 rounded-md font-bold text-white hover:bg-blue-600 focus:bg-blue-600">Save</button>
                            <button className="bg-white py-2 rounded-md font-bold text-black border border-gray-400 hover:bg-gray-100 focus:bg-gray-100">Edit profile</button>
                            <button type="submit" className="bg-red-500 py-2 rounded-md font-bold text-white hover:bg-red-600 focus:bg-red-600">Delete account</button>
                        </div>
                    </form>
                </div>
                <SideBar/>
            </div>
            <Footer signedin={ true }/>
        </div>
    )
}