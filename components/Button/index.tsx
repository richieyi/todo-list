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
  let classColor = 'bg-blue-500 hover:bg-blue-700';

  if (color === 'red') {
    classColor = 'bg-red-500 hover:bg-red-700';
  }

  return (
    <button
      type={type}
      className={`${classColor} disabled:bg-gray-200 text-white font-bold px-4 py-2 rounded`}
      disabled={disabled}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default Button;
