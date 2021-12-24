import Link from 'next/link'
import Head from '../uni/head'
import Footer from '../uni/footer'
import SignOpts from './signopts'

export default function User(props) {
    return (
        <div className="dark:bg-black">
            <Head title={props.type + " \u00b7 LinkHub"} desc="Sign in or create an account on LinkHub"/>
            <div className="flex flex-col-reverse md:flex-row place-content-center gap-x-4 min-h-screen">
                <div className="md:w-1/2 p-8 bg-cover bg-home-1">
                    <img src="/assets/logo.svg" className="object-contain h-full" alt=""/>
                </div>    
                <div className="flex flex-col place-content-start md:w-1/2 p-8 gap-4 bg-white dark:bg-black">
                    <img src="/assets/icon-black.svg" className="object-contain w-16 mb-8 dark:filter dark:invert" alt="LinkHub Icon"/>
                    <h1 className="text-black dark:text-white text-5xl font-bold mb-6">{ props.line1 }</h1>
                    <h2 className="text-black dark:text-white text-4xl font-bold mb-4">{ props.line2 }</h2>
                    <SignOpts type={ props.type } href={ props.loc }/>
                    <p className="dark:text-white">{ props.rdesc }<span><a href={ props.rloc } className="text-blue-500 hover:underline focus:underline">{ props.rtype }</a></span></p>
                    <p className="font-bold dark:text-white">OR</p>
                    <p className="dark:text-white"><span><Link href="/explore"><a className="text-blue-500 hover:underline focus:underline">Explore LinkHub</a></Link></span> without an account</p>
                </div>
            </div>
            <Footer signedin={ false }/>
        </div>
    )
}