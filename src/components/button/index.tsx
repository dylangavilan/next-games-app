import { cn } from '@/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';
import React, { ButtonHTMLAttributes } from 'react';

type ButtonVariants = VariantProps<typeof button>;

type Props = ButtonHTMLAttributes<HTMLButtonElement> & ButtonVariants & {
  loading?: boolean;
};

const button = cva(
  'px-4 py-2 rounded-full font-semibold text-base transition-all duration-200',
  {
    variants: {
      variant: {
        primary: 'bg-aera-violet-900 text-white',
        secondary: 'border border-aera-violet-900 text-aera-violet-900 bg-white',
      },
      fit: {
        true: 'w-full',
        false: '',
      },
      loading: {
        true: 'opacity-70 cursor-not-allowed',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
      fit: false,
      loading: false,
    },
  }
);

const Button = ({ children, variant, loading, fit, className, ...props }: Props) => {
  
  const buttonClasses = cn(button({ variant, fit, loading }), className);

  return (
    <button {...props} className={buttonClasses} disabled={loading}>
      {loading ? 'Loading...' : children}
    </button>
  );
};

export default Button;
