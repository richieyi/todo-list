import React from 'react';

interface ButtonProps {
  type: 'button' | 'submit';
  text: string;
  disabled: boolean;
  onClick?: () => void;
}

function Button(props: ButtonProps) {
  const { type, text, disabled, onClick } = props;

  return (
    <button
      type={type}
      className="bg-blue-500 hover:bg-blue-700 disabled:bg-gray-200 text-white font-bold py-2 px-4 rounded"
      disabled={disabled}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default Button;
