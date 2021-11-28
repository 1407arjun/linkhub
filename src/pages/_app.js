import 'tailwindcss/tailwind.css'
import '../../public/styles/globals.css'
import Connect from '../server/loaders/database'
import { SessionProvider } from 'next-auth/react'

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={ session }>
      <Component {...pageProps} />
    </SessionProvider>  
  )
}

export async function getStaticProps() {
  await Connect()
}

export default MyApp
