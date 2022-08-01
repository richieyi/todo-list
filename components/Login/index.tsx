import React, { ChangeEvent, useContext, useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from './mutations';
import { UserContext } from '../../context/userContext';

function LoginForm() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { handleLogin } = useContext(UserContext);

  const [login] = useMutation(LOGIN, {
    onCompleted: (res) => {
      handleLogin(res.login.token);
    },
  });

  function handleSubmit(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    login({
      variables: {
        email,
        password,
      },
    });
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="text"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default LoginForm;
