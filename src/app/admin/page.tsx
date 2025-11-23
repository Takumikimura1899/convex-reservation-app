'use client';

import { SignOutButton } from '@clerk/nextjs';
import { useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';

export default function AdminPage() {
  const reservations = useQuery(api.reservations.list, {
    date: new Date().toISOString().split('T')[0],
  });

  return (
    <main className='min-h-screen bg-zinc-50 dark:bg-zinc-900 p-8 font-sans'>
      <div className='max-w-4xl mx-auto'>
        <header className='mb-8 flex justify-between items-center'>
          <h1 className='text-3xl font-bold text-zinc-900 dark:text-zinc-100'>
            Admin Dashboard
          </h1>
          <SignOutButton>
            <button
              type='button'
              className='px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors'
            >
              Sign Out
            </button>
          </SignOutButton>
        </header>

        <div className='bg-white dark:bg-zinc-800 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-700 p-6'>
          <h2 className='text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-4'>
            Today's Reservations
          </h2>
          {reservations === undefined ? (
            <p className='text-zinc-500'>Loading...</p>
          ) : reservations.length === 0 ? (
            <p className='text-zinc-500'>No reservations for today.</p>
          ) : (
            <div className='space-y-4'>
              {reservations.map((reservation) => (
                <div
                  key={reservation._id}
                  className='flex justify-between items-center p-4 border border-zinc-200 dark:border-zinc-700 rounded-lg'
                >
                  <div>
                    <p className='font-medium text-zinc-900 dark:text-zinc-100'>
                      {reservation.customerName}
                    </p>
                    <p className='text-sm text-zinc-500'>
                      {reservation.startTime}
                    </p>
                  </div>
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      reservation.status === 'active'
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300'
                        : 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300'
                    }`}
                  >
                    {reservation.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
