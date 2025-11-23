import ReservationSystem from '../components/ReservationSystem';

export default function Home() {
  return (
    <main className='min-h-screen bg-zinc-50 dark:bg-zinc-900 p-8 font-sans'>
      <div className='max-w-4xl mx-auto'>
        <header className='mb-8 text-center'>
          <h1 className='text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-2'>
            Reservation System
          </h1>
          <p className='text-zinc-600 dark:text-zinc-400'>
            Book your time slot easily.
          </p>
        </header>

        <ReservationSystem />
      </div>
    </main>
  );
}
