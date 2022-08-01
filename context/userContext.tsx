import { useState, useEffect, createContext } from 'react';
import { useRouter } from 'next/router';

export const UserContext = createContext({
  token: '',
  handleLogin: (_token: any) => {},
  handleLogout: () => {},
});

export const UserProvider = ({ children }: { children: any }) => {
  const [token, setToken] = useState<string>('');
  const router = useRouter();

  function handleLogin(token: string) {
    localStorage.setItem('token', token);
    setToken(token);
    router.push('/todos');
  }

  function handleLogout() {
    localStorage.removeItem('token');
    setToken('');
    router.push('/');
  }

  useEffect(() => {
    setToken(localStorage.getItem('token') || '');
  }, []);

  return (
    <UserContext.Provider
      value={{ token, handleLogin, handleLogout }}
    >
      {children}
    </UserContext.Provider>
  );
};
