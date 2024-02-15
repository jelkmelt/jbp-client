import Layout from '../components/layout';
import { SessionProvider } from 'next-auth/react';
import PostProvider from '../context/postContext/postState';
import PaymentProvider from '@/context/payment/paymentState';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import '../styles/globals.css';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <>
      <Toaster
        toastOptions={{
          duration: 3000,
        }}
      />
      <QueryClientProvider client={queryClient}>
        <SessionProvider session={session}>
          <PostProvider>
            <PaymentProvider>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </PaymentProvider>
          </PostProvider>
        </SessionProvider>
      </QueryClientProvider>
    </>
  );
}
