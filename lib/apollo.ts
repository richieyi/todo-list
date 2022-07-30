import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// Specifies gql endpoint I interact with
const httpLink = createHttpLink({
  uri: 'api/graphql',
});

const authLink = setContext((_, { headers }) => {
  // Get auth token from local storage
  const token = localStorage.getItem('token');
  // Return headers to context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// Creating new apollo client instance
// Passing in config object with uri and cache fields
const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  // Used to cache query results after fetching
  cache: new InMemoryCache(),
});

export default apolloClient;
