import NavLinks from 'app/components/nav-link'
import dynamic from 'next/dynamic'
import Link from 'next/link'

const links = [
  { href: 'blog', text: 'Blog' },
  { href: 'about', text: 'About' }
]
export default function Header() {
  return (
    <header className='fixed z-10 w-full border-foreground border-b bg-background shadow-inner'>
      <nav className='wrapper relative flex items-center justify-between p-2'>
        <div className='mr-4 flex items-center'>
          <Logo />
        </div>
        <NavLinks links={links} />
        <div className='relative flex'>
          <ThemeToggleButton />
        </div>
      </nav>
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
