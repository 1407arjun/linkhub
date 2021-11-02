import Head from './components/head'

export default function Index() {
  return (
    <div className="flex flex-col place-content-start h-full">
      <Head title="An open source resources network &middot; LinkHub"/>
      <div className="flex flex-col flex-auto place-content-center w-full bg-cover bg-home-1 h-full p-4">
        <div className="flex flex-row px-4 py-4">
          <img src="/assets/logo.svg" className="w-1/2 sm:w-1/3 md:w-1/4 xl:w-1/6 mx-auto lg:mr-4" />
          <div className="hidden md:inline-flex flex-row flex-auto place-content-center md:justify-end md:content-center md:mr-4">
            <h1>Hello</h1>
            <h1>Hello</h1>
            <h1>Hello</h1>
            <h1>Hello</h1>
          </div>
        </div>

        <div className="flex flex-col md:flex-row flex-auto place-content-center w-full text-center md:text-left">
          <div className="flex flex-col flex-auto place-content-center p-8 w-full gap-y-2 md:justify-center md:content-start w-full md:w-2/3 lg:w-1/2">
            <h1 className="text-white text-5xl lg:text-6xl font-bold">An open source resources network</h1>
            <h2 className="text-white text-xl lg:text-3xl text-opacity-40">Insert multiline tagline here</h2>
          </div>
          <img src="/assets/home-2.gif" className="mt-4 mb-8 mx-auto md:m-4 object-contain w-3/4 sm:w-2/3 md:w-1/3 lg:w-1/2"/>
        </div>
      </div>
    </div>
  )
}
