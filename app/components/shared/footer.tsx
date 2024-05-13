import Link from 'next/link'

export default function Footer() {
  return (
    <footer className='w-full border-foreground border-t'>
      <div className='wrapper flex min-h-64 flex-col items-center justify-around'>
        <Link href='/'>
          <div className='flex flex-col items-center'>
            <span className='notranslate font-semibold text-lg'>ODS Study</span>
          </div>
        </Link>
      </div>
    </footer>
  )
}
