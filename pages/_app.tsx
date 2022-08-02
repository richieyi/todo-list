import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client';
import { UserContext, UserProvider } from '../context/userContext';
import apolloClient from '../lib/apollo';
import Layout from '../components/Layout';
import { useContext, useEffect } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  const { token } = useContext(UserContext);

  useEffect(() => {
    console.log('use effect', token);
  }, [token]);

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
