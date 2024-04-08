import Link from 'next/link'

export default function Footer() {
  return (
    <footer className='w-full border-t'>
      <div className='wrapper flex min-h-64 flex-col items-center justify-around'>
        <Link href='/'>
          <div className='flex flex-col items-center'>
            <span className='text-lg font-semibold'>ODS Study</span>
          </div>
        </Link>
      </div>
    </footer>
  )
}
