import React, { useState } from 'react';
import { cva, VariantProps } from 'class-variance-authority';

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

const FilterButton = ({ label, selected, onClick }: ButtonProps) => (
  <button onClick={onClick} className={buttonStyles({ selected })}>
    {label}
  </button>
);

type Props = {
  handleSort: (method: "newest" | "oldest" | "last_added") => void
}
type Option = {
  title: string,
  method: "newest" | "oldest" | "last_added"
}
export default function Tabs({handleSort}: Props) {
  const [selected, setSelected] = useState('Last added');

  const options: Option[] = [
    {title: 'Last added', method: 'last_added'}, 
    {title: 'Newest', method: 'newest'}, 
    {title: 'Oldest', method: 'oldest'}];
  
  return (
    <div className="flex flex-col items-left gap-4">
      <h2 className="text-lg font-semibold text-aera-violet-900">Saved games</h2>
      <div className="flex gap-2">
        {options.map((option) => (
          <FilterButton
            key={option.title}
            label={option.title}
            selected={selected === option.title}
            onClick={() => {setSelected(option.title), handleSort(option.method)}}
          />
        ))}
      </div>
    </div>
  );
}
