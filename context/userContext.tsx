import {
  useState,
  useEffect,
  createContext,
  useContext,
} from 'react';
import { useRouter } from 'next/router';
import { gql, useQuery } from '@apollo/client';

export const UserContext = createContext({
  userId: '',
  handleLogin: (_token: any) => {},
  handleLogout: () => {},
});

const GET_USER = gql`
  query GetUser {
    user {
      id
      name
    }
  }
`;

export const UserProvider = ({ children }: { children: any }) => {
  const [userId, setUserId] = useState<string>('');
  const router = useRouter();
  const { data, loading, error } = useQuery(GET_USER);

  function handleLogin(userId: string) {
    // localStorage.setItem('token', token);
    setUserId(userId);
    router.push('/todos');
  }

  function handleLogout() {
    // localStorage.removeItem('token');
    setUserId('');
    router.push('/');
  }

  useEffect(() => {
    // setToken(localStorage.getItem('token') || '');
    if (data?.user && !loading && !error) {
      setUserId(data.user.id);
    }
  }, [data, loading, error]);

  return (
    <UserContext.Provider
      value={{ userId, handleLogin, handleLogout }}
    >
      {children}
    </UserContext.Provider>
  );
};

export function useUser() {
  const context = useContext(UserContext);
  return context;
}
