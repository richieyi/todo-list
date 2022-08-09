import React from 'react';

type ButtonType = 'button' | 'submit';
type ButtonColor = 'red' | 'blue';

interface ButtonProps {
  type: ButtonType;
  color: ButtonColor;
  text: string;
  disabled: boolean;
  onClick?: () => void;
}

function Button(props: ButtonProps) {
  const { type, color, text, disabled, onClick } = props;

  return (
    <button
      type={type}
      className={`bg-${color}-500 hover:bg-${color}-700 disabled:bg-gray-200 text-white font-bold px-4 py-2 rounded`}
      disabled={disabled}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default Button;
