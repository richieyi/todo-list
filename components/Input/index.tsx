import React, { ChangeEvent } from 'react';

interface InputProps {
  labelName: string;
  type: 'text' | 'password';
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

function Input(props: InputProps) {
  const { labelName, type, name, value, onChange, disabled } = props;

  return (
    <>
      <label htmlFor={name} className="mt-2">
        {labelName}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-2"
        disabled={disabled}
      />
    </>
  );
}

export default Input;
