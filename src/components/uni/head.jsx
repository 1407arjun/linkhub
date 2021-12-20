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
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <title>{ props.title }</title>
        <meta name='description' content="An open source resources network"/>
        <link rel='icon' href={ theme === "dark" ? '/assets/icon.svg' : '/assets/icon-black.svg'}/>
      </NextHead>
    )
  }