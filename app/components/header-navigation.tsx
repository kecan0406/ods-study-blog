'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const LINKS = [
  { href: 'writer', text: 'Writer' },
  { href: 'writing', text: 'Writing' }
]

export default function HeaderNavigation() {
  const anchor = usePathname().split('/')[1]

  return (
    <nav
      className='nav-anchor scroll-thin grow items-center gap-1 overflow-x-auto'
      anchor={anchor.startsWith('@') ? 'writer' : anchor}
    >
      <ul className='flex font-medium text-primary text-sm'>
        {LINKS.map(({ href, text }) => (
          <li key={href}>
            <Link id={href} className='inline-block h-9 px-4 py-2' scroll={false} href={`/${href}`}>
              {text}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
