import React, { useState } from 'react';
import { cva, VariantProps } from 'class-variance-authority';

// Define los estilos para los botones con `cva`
const buttonStyles = cva(
  'px-4 py-1.5 rounded-full transition-all', 
  {
    variants: {
      selected: {
        true: 'bg-aera-violet-900 text-white',
        false: 'text-aera-violet-900 hover:bg-aera-violet-100',
      },
    },
    defaultVariants: {
      selected: false,
    },
  }
);

type ButtonProps = VariantProps<typeof buttonStyles> & {
  label: string;
  onClick: () => void;
};

// Componente de botón que recibe `selected` como prop
const FilterButton = ({ label, selected, onClick }: ButtonProps) => (
  <button onClick={onClick} className={buttonStyles({ selected })}>
    {label}
  </button>
);

export default function Tabs() {
  const [selected, setSelected] = useState('Last added');
  const options = ['Last added', 'Newest', 'Oldest'];

  return (
    <div className="flex flex-col items-left gap-4">
      <h2 className="text-lg font-semibold text-aera-violet-900">Saved games</h2>
      <div className="flex gap-2">
        {options.map((option) => (
          <FilterButton
            key={option}
            label={option}
            selected={selected === option}
            onClick={() => setSelected(option)}
          />
        ))}
      </div>
    </div>
  );
}
