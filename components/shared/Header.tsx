import ThemeToggleButton from '@/components/theme-toggle-button'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { ReactNode } from 'react'

const Logo = () => {
  return (
    <Link href='/'>
      <span className='inline-flex h-10 items-center px-2 text-lg font-bold'>
        <Image src='/assets/images/logo.svg' width={32} height={32} alt='ODS Logo' className='mr-2 w-auto' />
        ODS Study
      </span>
    </Link>
  )
}

type NavLinkProps = { href: string; children: ReactNode }
const NavLink = ({ href, children }: NavLinkProps) => {
  return (
    <Button variant='link' className='h-10 p-3 font-bold'>
      <Link scroll={false} href={href}>
        {children}
      </Link>
    </Button>
  )
}

const Header = () => {
  return (
    <header className='fixed z-10 w-full border-b backdrop-blur-sm'>
      <nav className='wrapper flex items-center justify-between p-2'>
        <div className='mr-4 flex items-center'>
          <Logo />
        </div>
        <div className='flex flex-grow items-center gap-1'>
          <NavLink href='/blog'>Blog</NavLink>
          <NavLink href='/about'>About</NavLink>
        </div>
        <div className='relative flex'>
          <ThemeToggleButton />
        </div>
      </nav>
    </header>
  )
}

export default Header
