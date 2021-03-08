import 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/layout.module.css';
import { useState } from 'react';
import { useAuth } from '@/lib/auth';

const Login = () => {
  const { signInWithGoogle } = useAuth();
  return (
    <button
      aria-label="login"
      className={styles.auth}
      onClick={() => signInWithGoogle()}
    >
      Login
    </button>
  );
};

const Logout = () => {
  const {
    user: { name },
    signout
  } = useAuth();

  return (
    <>
      <span className={styles.navName}>{name}</span>
      <button
        aria-label="logout"
        className={styles.auth}
        onClick={() => signout()}
      >
        Logout
      </button>
    </>
  );
};

export default function Layout({ children }) {
  const { user } = useAuth();
  const [hop, setHop] = useState(false);
  return (
    <div
      className={styles.page}
      style={{ backgroundImage: 'url(/images/background-02.webp)' }}
    >
      <Head>
        <title>Caroousel</title>
        <link rel="shortcut icon" type="image/x-icon" href="favicon.ico" />
        <meta charSet="UTF-8" />
      </Head>
      <header className={styles.header}>
        <Link href="/">
          <a>
            <h1
              aria-label="caroosel"
              className={styles.brand}
              onMouseEnter={() => setHop(true)}
              onMouseLeave={() => setHop(false)}
            >
              CaRoosel
              <img
                src="/images/roo.svg"
                className={`${hop ? styles.hop : ''} w-16 h-16`}
              />
            </h1>
          </a>
        </Link>
        <nav className={styles.nav} aria-label="Navigation Bar">
          <Link href="/about">
            <a className={styles.navLink}>About</a>
          </Link>
          <Link href="/contact">
            <a className={styles.navLink}>Contact</a>
          </Link>
        </nav>
        <a className={styles.navCred}>{user ? <Logout /> : <Login />}</a>
      </header>
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>
        <div>App created by Connor Gunderson</div>
        <div>Free for All, Free Forever</div>
        <span className={styles.copyRight}>
          CaRoosel is property of Connor Gunderson &copy;2021 All Rights
          Reserved
        </span>
      </footer>
    </div>
  );
}
