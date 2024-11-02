import React, { ButtonHTMLAttributes } from 'react'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: 'primary' | 'secondary';
    loading?: boolean;
    fit?: boolean;
  };

const Button = ({ children }: Props) => {
  return (
    <button>{children}</button>
  )
};

export default Button