import '../styles/globals.css'
import '../styles/tailwind.css'
import { Auth0Provider} from '@auth0/auth0-react'

function MyApp({ Component, pageProps}) {
  return (
    <Auth0Provider
      domain={"dev-cpphr8b5.us.auth0.com"}
      clientId={"xF0bk6ihbe3XNNQzntQfnRoQ0oLmiT9L"}
      redirectUri={encodeURI("https://mi-472-project01.vercel.app/")}
    >
      <Component {...pageProps} />
    </Auth0Provider>
  )
}

export default MyApp