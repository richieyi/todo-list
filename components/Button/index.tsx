import React from 'react';

type ButtonType = 'button' | 'submit';

interface ButtonProps {
  type: ButtonType;
  text: string;
  disabled: boolean;
  onClick?: () => void;
}

function Button(props: ButtonProps) {
  const { type, text, disabled, onClick } = props;

  return (
    <button
      type={type}
      className="bg-blue-500 hover:bg-blue-700 disabled:bg-gray-200 text-white font-bold px-4 rounded"
      disabled={disabled}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default Button;
