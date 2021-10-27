import Head from 'next/head'
import Script from 'next/script'
import styles from '../styles/Landing.module.css'

const addSubscriber = async event => {
    event.preventDefault()

    const res = await fetch(
      '/api/subscribe',
      {
        body: JSON.stringify({
          email: event.target.email.value
        }),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST'
      }
    )

    const result = await res.json()
    event.target.reset()
    
    if (result.acknowledged !== undefined && result.acknowledged)
        alert("You have successfully subscribed to updates. Stay tuned.")
    else
        alert("Internal server error. Please try again.")
  }

export default function Landing () {
  
  return (
    <div className={styles.container}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>LinkHub</title>
        <meta name='description' content='An open source resources network' />
        <link rel='icon' href='/assets/favicon.ico' />
      </Head>

      <header id="header" className="d-flex align-items-center">
          <div className="container d-flex flex-column align-items-center">

            <img src="/assets/logo.svg" alt="LinkHub" className="img-fluid" width="40%"/>
            <br />
            <h2>Stay tuned. Launching in</h2>
            <div className="countdown d-flex justify-content-center" data-count="2021/12/1">
              <div>
                <h3>%d</h3>
                <h4>Days</h4>
              </div>
              <div>
                <h3>%h</h3>
                <h4>Hours</h4>
              </div>
              <div>
                <h3>%m</h3>
                <h4>Minutes</h4>
              </div>
              <div>
                <h3>%s</h3>
                <h4>Seconds</h4>
              </div>
            </div>

            <div className="subscribe">
              <h4>Subscribe now to get the latest updates!</h4>
              <form onSubmit={ addSubscriber }>
                <div className="subscribe-form">
                  <input type="email" name="email" required></input>
                  <input type="submit" value="Notify Me"></input>
                </div>
              </form>
            </div>

            <div className="social-links text-center">
              <a href="https://twitter.com/LinkHub_Org" className="twitter link"><i className="bi bi-twitter sicon"></i></a>
              <a href="https://instagram.com/linkhub_org" className="instagram link"><i className="bi bi-instagram sicon"></i></a>
              <a href="https://linkedin.com/company/linkhub-org" className="linkedin link"><i className="bi bi-linkedin sicon"></i></a>
            </div>
          </div>
        </header>
        <Script src="/js/landing.js"></Script>
    </div>
  )
}
