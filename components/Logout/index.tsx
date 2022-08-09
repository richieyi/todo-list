import { useMutation } from '@apollo/client';
import React, { useEffect } from 'react';
import { useUser } from '../../context/userContext';
import { LOGOUT } from './mutations';

function Logout() {
  const { handleLogout } = useUser();
  const [logout] = useMutation(LOGOUT, {
    onCompleted: () => {
      handleLogout();
    },
  });

  useEffect(() => {
    logout();
  }, [logout]);

  return (
    <div>
      <h1>Logout Page</h1>
    </div>
  );
}

export default Logout;
