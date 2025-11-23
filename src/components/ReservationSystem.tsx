'use client';

import { useMutation, useQuery } from 'convex/react';
import { useState } from 'react';
import { api } from '../../convex/_generated/api';
import ReservationModal from './ReservationModal';

export default function ReservationSystem() {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const reservations = useQuery(api.reservations.list, { date: selectedDate });
  const createReservation = useMutation(api.reservations.create);
  const cancelReservation = useMutation(api.reservations.cancel);

  // Generate time slots from 9:00 to 18:00
  const timeSlots = Array.from({ length: 10 }, (_, i) => {
    const hour = i + 9;
    return `${hour.toString().padStart(2, '0')}:00`;
  });

  const handleSlotClick = (time: string) => {
    const existing = reservations?.find(
      (r) => r.startTime === time && r.status === 'active'
    );
    if (existing) {
      // Optional: Allow cancellation if it's the user's reservation (simplified here)
      if (confirm('Do you want to cancel this reservation?')) {
        cancelReservation({ id: existing._id });
      }
      return;
    }
    setSelectedSlot(time);
    setIsModalOpen(true);
  };

  const handleConfirmReservation = async (name: string) => {
    if (selectedSlot) {
      try {
        await createReservation({
          customerName: name,
          date: selectedDate,
          startTime: selectedSlot,
        });
        setIsModalOpen(false);
        setSelectedSlot(null);
      } catch {
        alert('Failed to book slot. It might be already taken.');
      }
    }
  };

  return (
    <div className='bg-white dark:bg-zinc-800 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-700 p-6 mb-8'>
      <div className='flex items-center justify-between mb-6'>
        <h2 className='text-xl font-semibold text-zinc-900 dark:text-zinc-100'>
          Available Slots
        </h2>
        <input
          type='date'
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className='px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
      </div>

      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4'>
        {timeSlots.map((time) => {
          const reservation = reservations?.find(
            (r) => r.startTime === time && r.status === 'active'
          );
          const isBooked = !!reservation;

          return (
            <button
              type='button'
              key={time}
              onClick={() => handleSlotClick(time)}
              className={`
                p-4 rounded-lg border transition-all duration-200 flex flex-col items-center justify-center gap-2
                ${
                  isBooked
                    ? 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800 cursor-not-allowed'
                    : 'bg-white border-zinc-200 hover:border-blue-500 hover:shadow-md dark:bg-zinc-800 dark:border-zinc-700 dark:hover:border-blue-500'
                }
              `}
            >
              <span className='text-lg font-medium text-zinc-900 dark:text-zinc-100'>
                {time}
              </span>
              <span
                className={`text-xs font-semibold px-2 py-1 rounded-full ${
                  isBooked
                    ? 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300'
                    : 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300'
                }`}
              >
                {isBooked ? 'Booked' : 'Available'}
              </span>
              {isBooked && (
                <span className='text-xs text-zinc-500 truncate max-w-full'>
                  {reservation.customerName}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <ReservationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmReservation}
        date={selectedDate}
        time={selectedSlot || ''}
      />
    </div>
  );
}
