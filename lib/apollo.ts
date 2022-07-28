import { ApolloClient, InMemoryCache } from '@apollo/client';

// Creating new apollo client instance
// Passing in config object with uri and cache fields
const apolloClient = new ApolloClient({
  // Specifies gql endpoint I interact with
  uri: 'http://localhost:3000/api/graphql',
  // Used to cache query results after fetching
  cache: new InMemoryCache(),
});

export default apolloClient;
