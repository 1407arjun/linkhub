import Head from './components/head'

export default function Index() {
  return (
    <div className="flex flex-col place-content-start h-full">
      <Head title="An open source resources network &middot; LinkHub"/>
      <div className="flex flex-col flex-auto place-content-center w-full bg-cover bg-home-1 h-full p-4">
        <div className="flex flex-row px-4 py-2">
          <img src="/assets/logo.svg" className="w-1/2 sm:w-1/3 lg:w-1/4 xl:w-1/6 mx-auto lg:mr-4" />
          <div className="hidden lg:inline-flex flex-row flex-auto place-content-center lg:justify-end lg:content-center lg:mr-4">
            <h1>Hello</h1>
            <h1>Hello</h1>
            <h1>Hello</h1>
            <h1>Hello</h1>
          </div>
        </div>

        <div className="flex flex-col md:flex-row flex-auto place-content-center w-full">
          <div className="flex flex-col flex-auto place-content-center p-16 w-full gap-y-2 text-center md:justify-center md:content-start md:text-left w-1/2">
            <h1 className="text-white text-6xl font-bold">An open source resources network</h1>
            <h2 className="text-white text-3xl text-opacity-40">Insert multiline tagline here</h2>
          </div>
          <img src="/assets/home-2.gif" className="m-16 md:m-8 object-contain"/>
        </div>
      </div>
    </div>
  )
}
