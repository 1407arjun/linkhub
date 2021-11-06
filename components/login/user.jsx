import Link from 'next/link'
import Head from '../uni/head'
import Footer from '../uni/footer'
import SignOpts from './signopts'

export default function User(props) {
    return (
        <div>
            <Head title={props.type + " \u00b7 LinkHub"}/>
            <div className="flex flex-col-reverse md:flex-row place-content-center gap-x-4 h-full">
                <div className="md:w-1/2 p-8 bg-cover bg-home-1">
                    <img src="/assets/logo.svg" className="object-contain h-full" alt=""/>
                </div>    
                <div className="flex flex-col place-content-start md:w-1/2 p-8 gap-4 bg-white">
                    <img src="/assets/icon-black.svg" className="object-contain w-16 mb-8" alt="LinkHub Icon"/>
                    <h1 className="text-black text-5xl font-bold mb-6">{ props.line1 }</h1>
                    <h2 className="text-black text-4xl font-bold mb-4">{ props.line2 }</h2>
                    <SignOpts type={ props.type }/>
                    <p>{ props.rdesc }<span><a href={ props.rloc } className="text-blue-500 hover:underline">{ props.rtype }</a></span></p>
                </div>
            </div>
            <Footer signedin={ false }/>
        </div>
    )
}