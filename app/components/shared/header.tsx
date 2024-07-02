import HeaderNavigation from 'app/components/header-navigation'
import MenuDrawer from 'app/components/menu-drawer'
import ThemeToggleButton from 'app/components/theme-toggle-button'
import Link from 'next/link'

export default function Header() {
  return (
    <header className='sticky top-0 z-20 h-12 bg-background'>
      <div className='wrapper flex h-full items-center'>
        <Logo />
        <HeaderNavigation />
        <div className='m-0 flex grow justify-end gap-1'>
          <ThemeToggleButton />
          <MenuDrawer />
        </div>
      </div>
    </header>
  )
}

function Logo() {
  return (
    <div className='mr-4'>
      <Link href='/'>
        <span className='notranslate inline-flex h-10 items-center text-nowrap px-2 font-bold text-lg'>ODS Study</span>
      </Link>
    </div>
  )
}
