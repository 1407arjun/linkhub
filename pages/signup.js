import Head from './components/uni/head'
import Footer from './components/uni/footer'
import SignOpts from './components/uni/signopts'

const catchline1 = "Resources made open-source"
const catchline2 = "Join LinkHub today."

export default function SignUp() {
    return (
        <div className="h-screen">
            <Head title="Login to LinkHub" />
            <div className="flex flex-row place-content-center gap-x-4 h-full">
                <div className="hidden lg:block w-1/2 p-8">
                    <img src="/assets/logo-black.svg" className="object-contain h-full"/>
                </div>    
                <div className="flex flex-col place-content-start w-1/2 p-8 gap-4">
                    <img src="/assets/icon-black.svg" className="object-contain w-16 mb-8"/>
                    <h1 className="text-black text-5xl font-bold mb-6">{ catchline1 }</h1>
                    <h2 className="text-black text-4xl font-bold mb-4">{ catchline2 }</h2>
                    <SignOpts type="Sign up"/>
                    <p>Already have an account? <span><a href="/signin" className="text-blue-500 hover:underline">Sign in</a></span></p>
                </div>
            </div>
            <Footer />
        </div>
    )
}