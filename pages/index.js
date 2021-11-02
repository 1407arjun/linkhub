import Head from './components/uni/head'
import HomeBar from './components/index/homebar'
import SignUpBar from './components/index/signupbar'

const tagline = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin mattis magna vel viverra faucibus. Curabitur mi ante, eleifend at dui non, feugiat congue lectus."

export default function Index() {
  return (
    <div className="flex flex-col place-content-center">
      <Head title="LinkHub &middot; An open source resources network"/>
      <div className="wrapper grad-home p-4"> {/* bg-cover bg-home-1*/}
        <HomeBar />
        <div className="mx-auto my-4 md:my-8 flex flex-col-reverse md:flex-row place-content-center w-full text-center md:text-left">
          <div className="flex flex-col flex-grow-1 place-content-center p-6 md:p-8 w-full gap-y-2 md:justify-center md:content-start w-full md:w-2/3 lg:w-1/2">
            <h1 className="md:mt-8 text-white text-4xl sm:text-5xl lg:text-6xl font-bold">An open source resources network</h1>
            <h2 className="text-white text-m sm:text-l lg:text-2xl text-opacity-60">{ tagline }</h2>
            <SignUpBar />
          </div>

          <img src="/assets/home-2.gif" className="mt-4 mb-8 mx-auto md:m-4 object-contain w-3/4 sm:w-2/3 md:w-1/3 lg:w-1/2" alt=""/>
        </div>
      </div>
    </div>
  )
}
