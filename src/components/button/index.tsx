import React, { ButtonHTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant: 'primary' | 'secondary';
    loading?: boolean;
    fit?: boolean;
  };

const Button = ({ children, variant, className }: Props) => {
  const styles = {
    primary: 'bg-aera-violet-900 text-white',
    secondary: 'border-aera-violet-900 text-aera-violet-900 border'
  }
  return (
    <button className={twMerge('w-full px-2 py-4 rounded-[30px] font-semibold text-base', 
            styles[variant], 
            className)}>
      {children}
    </button>
  )
};

export default Button