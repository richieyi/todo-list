import React, { ChangeEvent, useContext, useState } from 'react';
import { useMutation } from '@apollo/client';
import { SIGN_UP } from './mutations';
import { UserContext } from '../../context/userContext';

function SignUpForm() {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const { handleLogin } = useContext(UserContext);

  const [signUp] = useMutation(SIGN_UP, {
    onCompleted: (res) => {
      handleLogin(res.signUp.token);
    },
  });

  function handleSubmit(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    signUp({
      variables: {
        name,
        email,
        password,
      },
    });
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default SignUpForm;
