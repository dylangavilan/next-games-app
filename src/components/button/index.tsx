import React, { ButtonHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant: 'primary' | 'secondary';
  loading?: boolean;
  fit?: boolean;
};

const Button = ({ children, variant, loading, fit = false, className, ...props }: Props) => {
  const baseStyles = 'px-4 py-2 rounded-full font-semibold text-base transition-all duration-200';
  
  const variantStyles = {
    primary: 'bg-aera-violet-900 text-white hover:bg-aera-violet-700',
    secondary: 'border border-aera-violet-900 text-aera-violet-900 hover:bg-aera-violet-100'
  };
  
  const fitStyles = fit ? 'w-full' : '';

  const loadingStyles = loading ? 'opacity-70 cursor-not-allowed' : '';

  const buttonClasses = twMerge(baseStyles, variantStyles[variant], fitStyles, loadingStyles, className);

  return (
    <button {...props} className={buttonClasses} disabled={loading}>
      {loading ? 'Loading...' : children}
    </button>
  );
};

export default Button;
