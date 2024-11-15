'use client'
import React, { useEffect } from 'react';
import { type Toast, useToastStore } from '@/store/useToastStore';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import {  CheckCircle2Icon } from 'lucide-react';
import H2 from './h2';
import H4 from './h4';


const Toast = (props: Toast) => {
    const { removeToast } = useToastStore();
    const ref = useOutsideClick(() => removeToast(props.id))

    return  (
        <div ref={ref} className='bg-white flex flex-col ease-in transition-opacity duration-2000 border-aero-green-600 bg-[#fffff] p-4 gap-2 border rounded-lg'>
            <div className='flex gap-2 items-center'>
                <CheckCircle2Icon className='w-6 h-6 text-aero-green-600' />
                <H2>{props.title}</H2>
            </div>
            <div>
                <H4 className='text-aero-gray-400'>
                    {props.description}
                </H4>
            </div>
        </div>
    )
}

const ToastComponent = () => {
  const { toasts, removeFirst } = useToastStore();

  useEffect(() => {
    const intervalId = setInterval(() => {
      if(toasts.length > 0){
        removeFirst()
      }
    }, 1000 * 5);
    return () => clearInterval(intervalId);
  }, [toasts, removeFirst]);

  return (
    <div className='fixed bottom-10'>
        {toasts.map((toast: Toast) => (
          <Toast {...toast} key={toast.id}/>
        ))}
    </div>
  );
};

export default ToastComponent;