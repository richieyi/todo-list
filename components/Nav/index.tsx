import React, { useContext } from 'react';
import Link from 'next/link';
import { UserContext } from '../../context/userContext';

function Nav() {
  const { token } = useContext(UserContext);

  return (
    <div className="flex justify-end gap-4">
      {token ? <Link href="/todos">Todos</Link> : null}
      {token ? <Link href="/logout">Logout</Link> : null}
      {!token ? <Link href="/signup">Sign Up</Link> : null}
      {!token ? <Link href="/login">Login</Link> : null}
    </div>
  );
}

export default Nav;
