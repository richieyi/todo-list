import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

function Nav() {
  const router = useRouter();
  let isUserLoggedIn = false;

  if (typeof window !== 'undefined') {
    isUserLoggedIn = localStorage.getItem('token') ? true : false;
  }

  function handleLogout() {
    localStorage.removeItem('token');
    router.push('/');
  }

  return (
    <div>
      <Link href="/todos">Todos</Link>
      {!isUserLoggedIn ? <Link href="/signup">Sign Up</Link> : null}
      {!isUserLoggedIn ? <Link href="/login">Login</Link> : null}
      {isUserLoggedIn ? (
        <button onClick={handleLogout}>Logout</button>
      ) : null}
    </div>
  );
}

export default Nav;
