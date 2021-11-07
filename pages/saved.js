import Head from '../components/uni/head'
import Footer from '../components/uni/footer'
import NavBar from '../components/uni/navbar'
import SideBar from '../components/posts/sidebar'
import SearchBar from '../components/uni/searchbar'
import PostMini from '../components/posts/post-mini'

export default function Saved() {
    return (
        <div>
            <Head title="Saved Posts &middot; LinkHub"/>
            <div className="flex flex-row place-content-start">
                <NavBar current="Saved"/>
                <div className="flex flex-col gap-4 justify-start items-center w-full md:w-5/6 lg:w-7/12 xl:w-3/6 p-4">
                    <SearchBar placeholder="Search saved posts"/>
                    <h2 className="w-full font-bold text-2xl md:text-3xl text-left">Saved Posts</h2>
                    <div className="flex flex-col justify-center items-start w-full px-2 sm:px-4 gap-2 sm:gap-4">
                        <PostMini name="Arjun Sivaraman"
                            username="1407arjun"
                            title="Post Title"
                            body="Post Body"
                            upvotes="800"
                            downvotes="30"
                            flags="2"/>
                        <PostMini name="Thor"
                            username="thor"
                            title="Post Title"
                            body="Post Body"
                            upvotes="1.2K"
                            downvotes="0"
                            flags="50"/>
                    </div>
                    <p className="text-sm md:text-base italic">-- You have reached the end --</p>
                </div>
                <SideBar/>
            </div>
            <Footer signedin={ true }/>
        </div>
    )
}