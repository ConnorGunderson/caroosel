import '../styles/globals.css';
import '../styles/tailwind.css';
import { NextSeo } from 'next-seo';

import SEO from '../next-seo.config';
import { AuthProvider } from '@/lib/auth';
import { CardProvider } from '@/utils/cards';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <CardProvider>
        <NextSeo {...SEO} />
        <Component {...pageProps} />
      </CardProvider>
    </AuthProvider>
  );
}

export default MyApp;
