import Head from '../components/uni/head'
import Footer from '../components/index/footer'
import HomeBar from '../components/index/homebar'
import SignUpBar from '../components/index/signupbar'

const tagline = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin mattis magna vel viverra faucibus. Curabitur mi ante, eleifend at dui non, feugiat congue lectus."

export default function Index() {
  return (
    <div> {/* className="flex flex-col place-content-center" */}
      <Head title="LinkHub &middot; An open source resources network"/>
      <div className="grad-home">
        <HomeBar/>
        <div className="mx-auto my-4 flex flex-col-reverse lg:flex-row place-content-center w-full text-center lg:text-left px-4">
          <div className="flex flex-col flex-grow-1 place-content-center p-6 lg:p-8 gap-y-2 lg:justify-center lg:content-start w-full lg:w-2/3 xl:w-1/2">
            <h1 className="lg:mt-8 text-white text-4xl sm:text-5xl lg:text-6xl font-bold">An open source resources network</h1>
            <h2 className="text-white text-base sm:text-lg lg:text-2xl text-opacity-60">{ tagline }</h2>
            <SignUpBar/>
          </div>
          <img src="/assets/home-2.gif" className="object-contain mt-4 mb-8 mx-auto lg:m-4 w-3/4 sm:w-2/3 lg:w-1/2" alt=""/>
        </div>
        <Footer/>
      </div>
    </div>
  )
}
