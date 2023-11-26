import '../styles/globals.css';
import Layout from '../components/layout';

import { SessionProvider } from 'next-auth/react';
import PostProvider from '../context/postContext/postState';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <PostProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </PostProvider>
    </SessionProvider>
  );
}
