import React from 'react';

interface ButtonProps {
  text: string;
  disabled: boolean;
}

function Button(props: ButtonProps) {
  const { text, disabled } = props;

  return (
    <button
      type="submit"
      className="bg-blue-500 hover:bg-blue-700 disabled:bg-gray-200 text-white font-bold py-2 px-4 rounded"
      disabled={disabled}
    >
      {text}
    </button>
  );
}

export default Button;
