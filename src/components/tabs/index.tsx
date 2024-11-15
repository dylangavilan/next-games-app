import React, { useState } from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { useGameStore } from '@/store/useGamesStore';

const buttonStyles = cva(
  'px-4 py-1.5 rounded-full transition-all', 
  {
    variants: {
      selected: {
        true: 'bg-aero-violet-900 text-white',
        false: 'text-aero-violet-900 hover:bg-aero-violet-100',
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
  const { savedGames } = useGameStore(state => state)
  const options: Option[] = [
    {title: 'Last added', method: 'last_added'}, 
    {title: 'Newest', method: 'newest'}, 
    {title: 'Oldest', method: 'oldest'}];
  
  return (
    <div className="flex flex-col items-left gap-4">
      <h2 className="text-lg font-semibold text-aero-violet-600 lg:text-center">Saved games</h2>
      <div className="flex gap-2">
        {savedGames.length > 0 && options.map((option) => (
          <FilterButton
            key={option.title}
            label={option.title}
            selected={selected === option.title}
            onClick={() => { setSelected(option.title); handleSort(option.method)}}
          />
        ))}
      </div>
    </div>
  );
}
