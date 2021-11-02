export default function HomeBar() {
    return (
        <div className="flex flex-row px-4 py-4">
            <img src="/assets/logo.svg" className="w-1/2 sm:w-1/3 md:w-1/4 xl:w-1/6 mx-auto lg:mr-4" />
            <div className="hidden md:inline-flex flex-row flex-auto place-content-center md:justify-end md:content-center md:mr-4">
            <h1>Hello</h1>
            <h1>Hello</h1>
            <h1>Hello</h1>
            <h1>Hello</h1>
            </div>
        </div>
    )
}