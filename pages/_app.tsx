import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client';
import { UserProvider } from '../context/userContext';
import apolloClient from '../lib/apollo';
import Layout from '../components/Layout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    // Wrap with apollo provider so all components can send gql queries
    <ApolloProvider client={apolloClient}>
      <UserProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UserProvider>
    </ApolloProvider>
  );
}

export default MyApp
