import Head from './components/uni/head'
import HomeBar from './components/index/homebar'
import SignUpBar from './components/index/signupbar'


export default function Index() {
  return (
    <div className="flex flex-col place-content-start h-full">
      <Head title="LinkHub &middot; An open source resources network"/>
      <div className="flex flex-col place-content-center w-full bg-cover bg-home-1 h-full p-4">
        <HomeBar />

        <div className="flex flex-col-reverse md:flex-row place-content-center w-full text-center md:text-left">
          <div className="flex flex-col place-content-center p-6 md:p-8 w-full gap-y-2 md:justify-center md:content-start w-full md:w-2/3 lg:w-1/2">
            <h1 className="text-white text-4xl sm:text-5xl lg:text-6xl font-bold">An open source resources network</h1>
            <h2 className="text-white text-l sm:text-xl lg:text-3xl text-opacity-60">Insert multiline tagline here</h2>
            <SignUpBar />
          </div>

          <img src="/assets/home-2.gif" className="mt-4 mb-8 mx-auto md:m-4 object-contain w-3/4 sm:w-2/3 md:w-1/3 lg:w-1/2" alt=""/>
        </div>
      </div>
    </div>
  )
}
