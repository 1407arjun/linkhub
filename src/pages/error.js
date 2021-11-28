import Error from 'next/error'

export default function ErrorPage({ errorCode }) {
    return <Error statusCode={ errorCode }/>
}