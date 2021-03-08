import { useState } from 'react';
import Image from 'next/image';
import { FcGoogle } from 'react-icons/fc';

import { useAuth } from '@/lib/auth';
import styles from '@/styles/signin.module.css';
import router from 'next/router';

const SignInPage = () => {
  const [hop, setHop] = useState(false);
  const { signInWithGoogle } = useAuth();

  const handleAuth = () => {
    signInWithGoogle().then(() => {
      router.push('/')
    })
  }

  return (
    <>
      <div className={styles.body}>
        <div className={styles.container}>
          <h1
            aria-label="caroosel"
            className={styles.brand}
            onMouseEnter={() => setHop(true)}
            onMouseLeave={() => setHop(false)}
          >
            CaRoosel
            <span className={`${hop ? styles.hop : ''} w-16 h-16`}>
              <Image height={75} width={75} src="/images/roo.svg" />
            </span>
          </h1>
          <section>
            <header>
              <h2 className={styles.signIn}>
                Sign In
              </h2>
            </header>
            <div className={styles.authBody}>
              <button className={styles.google} onClick={() => handleAuth()}><FcGoogle size="2em" />Google</button>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default SignInPage;
