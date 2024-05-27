import HeaderNavigation from 'app/components/header-navigation'
import dynamic from 'next/dynamic'
import Link from 'next/link'

export default function Header() {
  return (
    <header className='fixed z-20 w-full border-foreground border-b bg-background shadow-inner'>
      <div className='wrapper flex items-center justify-between p-2'>
        <div className='mr-4 flex items-center'>
          <Logo />
        </div>
        <HeaderNavigation />
        <ThemeToggleButton />
      </div>
    </header>
  )
}

function Logo() {
  return (
    <Link href='/'>
      <span className='notranslate inline-flex h-10 items-center text-nowrap px-2 font-bold text-lg'>ODS Study</span>
    </Link>
  )
}

const ThemeToggleButton = dynamic(() => import('app/components/theme-toggle-button'), { ssr: false })
