import { ReactNode } from 'react';
import { create } from 'zustand';
type ToastType = 'added' | 'removed'; 

export type Toast = {
  id: number;
  type: ToastType,
  title: string,
  description: string
};

interface AppState {
  toasts: Toast[];
  addToast: (type: ToastType, title: string, description: string) => void;
  removeToast: (id: number) => void;
  removeFirst: () => void
}

export const useToastStore = create<AppState>((set) => ({
  toasts: [],
  addToast: (type: ToastType, title: string, description: string) => 
    set((state) => ({
      toasts: [...state.toasts, { id: Date.now(), type, title, description}]
    })),
  removeToast: (id: number) => 
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id)
    })),
   removeFirst: () => 
    set((state) => ({
        toasts: state.toasts.slice(1)
    })),
}));