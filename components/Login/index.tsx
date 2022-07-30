import React, { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';
import { LOGIN } from './mutations';

function LoginForm() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const router = useRouter();
  const [login] = useMutation(LOGIN, {
    onCompleted: (res) => {
      localStorage.setItem('token', res.login.token);
      router.push('/todos');
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
