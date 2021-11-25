import 'tailwindcss/tailwind.css'
import '../../public/styles/globals.css'
import Connect from '../server/loaders/database'

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export async function getStaticProps() {
  await Connect()
}

export default MyApp
