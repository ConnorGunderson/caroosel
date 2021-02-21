import 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/layout.module.css'
import { PropsWithChildren, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react' 

const navLinks = [
  {
    title: "Explore",
    href: "/explore"
  },
  {
    title: "Settings",
    href: "/settings"
  }
]

const Login = () => {
  const { loginWithRedirect } = useAuth0()
  return(
    <button aria-label="login" className={styles.auth} onClick={() => loginWithRedirect()}>
      Login
    </button>
  )
}

const Logout = ({name} : {name: string}) => {
  const { logout } = useAuth0()
  return(
    <>
      <span className={styles.navName}>
        {name}
      </span>
      <button aria-label="logout" className={styles.auth} onClick={() => logout()}>
        Logout
      </button>
    </>
  )
}

export default function Layout(props: PropsWithChildren<any>) {
  const { user, isAuthenticated} = useAuth0()
  const [hop, setHop] = useState(false)
  return (
    <div className={styles.page} style={{backgroundImage: "url(/images/background-02.webp)"}}>
      <Head>
        <title>Caroousel</title>
        <link rel="shortcut icon" type="image/x-icon" href="favicon.ico" />
        <meta charSet="UTF-8"/>
      </Head>
      <header className={styles.header}>
        <div className={styles.brand} onMouseEnter={() => setHop(true)} onMouseLeave={() => setHop(false)}>
          <h1 aria-label="caroosel" >
            <Link href="/">
                CaRoosel
            </Link>
          </h1>
          <a ><img src="/images/roo.svg" className={`${hop ? styles.hop: ""} w-16 h-16`} /></a>
        </div>
        <nav className={styles.nav} aria-label="Navigation Bar">
        </nav>
        <div className={styles.navCred}>
            {
              user && isAuthenticated ? <Logout name={user.name}/> : <Login />
            }
        </div>
      </header>
      <main className={styles.main}>{props.children}</main>
      <footer className={styles.footer}>
        <div>
          App created by Connor Gunderson
        </div>
        <div>
          Free for All, Free Forever 
        </div>
        <span className={styles.copyRight}>CaRoosel is property of Connor Gunderson &copy;2021 All Rights Reserved</span>
      </footer>
    </div>
  )
}