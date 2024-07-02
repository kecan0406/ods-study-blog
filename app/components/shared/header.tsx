import Link from 'next/link'
import HeaderNavigation from '../header-navigation'
import ThemeToggleButton from '../theme-toggle-button'

export default function Header() {
  return (
    <header className='z-20 h-12 bg-background'>
      <div className='wrapper flex h-full items-center'>
        <Logo />
        <HeaderNavigation />
        <ThemeToggleButton />
      </div>
    </header>
  )
}

function Logo() {
  return (
    <div className='mr-4 flex items-center'>
      <Link href='/'>
        <span className='notranslate inline-flex h-10 items-center text-nowrap px-2 font-bold text-lg'>ODS Study</span>
      </Link>
    </div>
  )
}
