import React, { useContext, useEffect } from 'react';
import { UserContext } from '../../context/userContext';

function Logout() {
  const { handleLogout } = useContext(UserContext);

  useEffect(() => {
    handleLogout();
  }, [handleLogout]);

  return (
    <div>
      <h1>Logout Page</h1>
    </div>
  );
}

export default Logout;
