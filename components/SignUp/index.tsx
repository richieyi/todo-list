import React, { ChangeEvent, useContext, useState } from 'react';
import { useMutation } from '@apollo/client';
import { SIGN_UP } from './mutations';
import { UserContext } from '../../context/UserContext';
import Input from '../Input';
import Button from '../Button';

function SignUpForm() {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const { handleLogin } = useContext(UserContext);

  const [signUp, { loading: signUpLoading }] = useMutation(SIGN_UP, {
    onCompleted: (res) => {
      handleLogin(res.signUp.user.id);
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
        <Input
          labelName="Name"
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
        <Input
          labelName="Confirm Password"
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button
          type="submit"
          text="Sign Up"
          disabled={signUpLoading}
          color="blue"
        />
      </form>
    </div>
  );
}

export default SignUpForm;
