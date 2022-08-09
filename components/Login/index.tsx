import React, { ChangeEvent, useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from './mutations';
import { useUser } from '../../context/UserContext';
import Input from '../Input';
import Button from '../Button';

function LoginForm() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { handleLogin } = useUser();

  const [login, { loading: loginLoading }] = useMutation(LOGIN, {
    onCompleted: (res) => {
      handleLogin(res.login.user.id);
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
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          labelName="Email"
          type="text"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          labelName="Password"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="submit"
          text="Log In"
          disabled={loginLoading}
          color="blue"
        />
      </form>
    </div>
  );
}

export default LoginForm;
