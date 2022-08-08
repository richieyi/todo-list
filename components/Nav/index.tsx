import React, { useContext } from 'react';
import Link from 'next/link';
import { UserContext } from '../../context/UserContext';

function Nav() {
  const { userId } = useContext(UserContext);

  return (
    <div className="flex w-full justify-end gap-4">
      {userId ? <Link href="/todos">Todos</Link> : null}
      {userId ? <Link href="/logout">Logout</Link> : null}
      {!userId ? <Link href="/signup">Sign Up</Link> : null}
      {!userId ? <Link href="/login">Login</Link> : null}
    </div>
  );
}

export default Nav;
