import { SignOutButton } from 'app/components/auth-buttons'
import NavLinks from 'app/components/nav-link'
import ThemeToggleButton from 'app/components/theme-toggle-button'
import Link from 'next/link'
import { Suspense } from 'react'
import { auth } from 'utils/auth'

const links = [
  { href: '/blog', text: 'Blog' },
  { href: '/about', text: 'About' }
]

export default function Header() {
  return (
    <header className='fixed z-10 w-full border-b backdrop-blur-sm'>
      <nav className='wrapper flex items-center justify-between p-2'>
        <div className='mr-4 flex items-center'>
          <Logo />
        </div>
        <NavLinks links={links} />
        <div className='relative flex'>
          <Suspense>
            <SignOut />
          </Suspense>
          <ThemeToggleButton />
        </div>
      </nav>
    </header>
  )
}

const Logo = () => {
  return (
    <Link href='/'>
      <span className='inline-flex h-10 items-center text-nowrap px-2 text-lg font-bold'>ODS Study</span>
    </Link>
  )
}

const SignOut = async () => {
  const session = await auth()
  const allowUsers = process.env.ALLOW_USERS!.split(',')

  const isAllowUser = allowUsers.includes(session?.user?.email ?? '')
  return <>{isAllowUser && <SignOutButton />}</>
}
