import { useMutation } from '@apollo/client';
import React, { useContext, useEffect } from 'react';
import { UserContext } from '../../context/userContext';
import { LOGOUT } from './mutations';

function Logout() {
  const { handleLogout } = useContext(UserContext);
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
