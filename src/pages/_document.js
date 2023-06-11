import Document, { Html, Head, Main, NextScript } from "next/document"

const tagline =
    "A portal to help you find the right resources to boost your learning from all those available on the World Wide Web. Links are ranked based on the feedback by others who have tried it out, so as to provide you only the best of the best."
class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
    }

    render() {
        return (
            <Html>
                <Head>
                    <meta
                        property="og:url"
                        content="https://linkhub.arjuns.software/"
                    />
                    <meta property="og:type" content="website" />
                    <meta
                        property="og:title"
                        content="LinkHub - An open source resources network"
                    />
                    <meta property="og:description" content={tagline} />
                    <meta
                        property="og:image"
                        content="https://linkhub.arjuns.software/assets/banner.jpg"
                    />
                    <meta property="og:site_name" content="LinkHub" />

                    <meta name="mobile-web-app-capable" content="yes" />
                    <meta name="apple-mobile-web-app-capable" content="yes" />

                    <link
                        rel="preconnect"
                        href="https://fonts.googleapis.com"
                    />
                    <link
                        rel="preconnect"
                        href="https://fonts.gstatic.com"
                        crossOrigin="true"
                    />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&amp;display=swap"
                        rel="stylesheet"
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument
