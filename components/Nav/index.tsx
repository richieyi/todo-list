import React, { useContext } from 'react';
import Link from 'next/link';
import { UserContext } from '../../context/userContext';

function Nav() {
  const { token, handleLogout } = useContext(UserContext);

  return (
    <div className="flex justify-end gap-4">
      <Link href="/todos">Todos</Link>
      {!token ? <Link href="/signup">Sign Up</Link> : null}
      {!token ? <Link href="/login">Login</Link> : null}
      {token ? <button onClick={handleLogout}>Logout</button> : null}
    </div>
  );
}

export default Nav;
