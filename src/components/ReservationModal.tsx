'use client';

import { useState } from 'react';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (name: string) => void;
  date: string;
  time: string;
}

export default function ReservationModal({
  isOpen,
  onClose,
  onConfirm,
  date,
  time,
}: ReservationModalProps) {
  const [name, setName] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onConfirm(name);
      setName('');
    }
  };

  return (
    <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
      <div className='bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-xl w-full max-w-md'>
        <h2 className='text-xl font-bold mb-4 text-zinc-900 dark:text-zinc-100'>
          Confirm Reservation
        </h2>
        <p className='mb-4 text-zinc-600 dark:text-zinc-400'>
          Booking for <span className='font-semibold'>{date}</span> at{' '}
          <span className='font-semibold'>{time}</span>
        </p>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label
              htmlFor='name'
              className='block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1'
            >
              Your Name
            </label>
            <input
              type='text'
              id='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder='Enter your name'
              required
            />
          </div>
          <div className='flex justify-end gap-2'>
            <button
              type='button'
              onClick={onClose}
              className='px-4 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded-md transition-colors'
            >
              Cancel
            </button>
            <button
              type='submit'
              className='px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors'
            >
              Confirm Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
