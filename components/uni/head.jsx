import NextHead from 'next/head'

export default function Head(props) {
    return (
      <NextHead>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <title>{ props.title }</title>
        <meta name='description' content="An open source resources network"/>
        <link rel='icon' href='/assets/favicon.ico' />
      </NextHead>
    )
  }