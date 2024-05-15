'use client'

import { buttonVariants } from 'app/components/ui/button'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const LINKS = [
  { href: 'author', text: 'Author' },
  { href: 'writing', text: 'Writing' },
  { href: 'about', text: 'About' }
]

export default function HeaderNavigation() {
  const anchor = usePathname().split('/')[1]

  return (
    <div className='nav-anchor flex flex-grow items-center gap-1' anchor={anchor}>
      {LINKS.map(({ href, text }) => (
        <Link
          id={href}
          className={buttonVariants({ variant: 'link', className: 'decoration-1' })}
          scroll={false}
          href={`/${href}`}
          key={href}
        >
          {text}
        </Link>
      ))}
    </div>
  )
}
