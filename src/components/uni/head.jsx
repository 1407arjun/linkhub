import NextHead from 'next/head'
import { useState, useEffect } from 'react'

export default function Head(props) {
    const [theme, setTheme] = useState()

    useEffect(() => {
        setTheme(window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light")
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
            setTheme(e.matches ? "dark" : "light")
        }); //add cleanup
    }, [theme])


    return (
      <NextHead>
        <meta name="google-site-verification" content="8II1ZS008rD9Vb8kkQlv8ipbKgfhLrjKDf-zj07RvsI" />
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <title>{ props.title }</title>
        <meta name='description' content={ props.desc }/>
        <link rel='icon' href={ theme === "dark" ? '/assets/icon.svg' : '/assets/icon-black.svg'}/>
        <link rel="image_src" href="/assets/icon-black.svg"/>
        <link type="application/opensearchdescription+xml" rel="search" href="/assets/xml/osdd.xml"/>
      </NextHead>
    )
  }