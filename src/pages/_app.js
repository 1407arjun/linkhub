import 'tailwindcss/tailwind.css'
import '../../public/styles/globals.css'
import 'nprogress/nprogress.css'
import { SessionProvider } from 'next-auth/react'
import nProgress from 'nprogress'
import { Router } from 'next/router'

Router.events.on("routeChangeStart", nProgress.start);
Router.events.on("routeChangeError", nProgress.done);
Router.events.on("routeChangeComplete", nProgress.done);

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={ session }>
      <Component {...pageProps} />
    </SessionProvider>  
  )
}

export default MyApp
