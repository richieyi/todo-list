import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserProvider } from '../context/userContext';
import apolloClient from '../lib/apollo';
import Layout from '../components/Layout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    // Wrap with apollo provider so all components can send gql queries
    <ApolloProvider client={apolloClient}>
      <UserProvider>
        <Layout>
          <>
            <Component {...pageProps} />
            <ToastContainer />
          </>
        </Layout>
      </UserProvider>
    </ApolloProvider>
  );
}

export default MyApp;
