import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home () {
  return (
    <div className={styles.container}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>LinkHub</title>
        <meta name='description' content='An open source resources network' />
        <link rel='icon' href='/assets/favicon.ico' />
      </Head>
      <Image src='/comingsoon.png' alt='Coming Soon' className="img-fluid" width="120"/>
    </div>
  )
}
