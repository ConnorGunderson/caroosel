import '../styles/globals.css';
import '../styles/tailwind.css';
import { NextSeo } from 'next-seo';

import SEO from '../next-seo.config';
import { AuthProvider } from '@/lib/auth';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
        <NextSeo {...SEO} />
        <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
