import React from 'react';
import Link from 'next/link';
import { useUser } from '../../context/userContext';

function Nav() {
  const { userId } = useUser();

  return (
    <div className="flex w-full justify-end gap-4">
      {userId ? <Link href="/todos">Todo Lists</Link> : null}
      {userId ? <Link href="/logout">Logout</Link> : null}
      {!userId ? <Link href="/signup">Sign Up</Link> : null}
      {!userId ? <Link href="/login">Login</Link> : null}
    </div>
  );
}

export default Nav;
