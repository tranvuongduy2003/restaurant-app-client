import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from 'layouts/Layout';

export default function App({ Component, pageProps, ...appProps }: AppProps) {
  if (['/auth/login', '/auth/signup'].includes(appProps.router.pathname)) {
    return <Component {...pageProps} />;
  }

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
