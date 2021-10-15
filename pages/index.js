import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
       <Head>
        <title>LinkHub</title>
        <meta name="description" content="An open source resources network" />
        <link rel="icon" href="/favicon.ico" />
       </Head>
       <Image src="/comingsoon.png" alt="Coming Soon" layout="responsive" />
    </div>
  )
}
