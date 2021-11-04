import Head from '../components/uni/head'
import Footer from '../components/index/footer'
import NavBar from '../components/home/navbar'

export default function Home() {
    return (
        <div>
            <Head title="LinkHub"/>
            <div className="flex flex-row place-content-start">
                <NavBar current="Home"/>

            </div>
        </div>
    )
}