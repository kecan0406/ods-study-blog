'use client'

import { buttonVariants } from 'app/components/ui/button'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type NavLinksProp = { links: { href: string; text: string }[] }
export default function NavLinks(props: NavLinksProp) {
  const anchor = usePathname().split('/')[1]

  return (
    <div className='nav-anchor flex flex-grow items-center gap-1' anchor={anchor}>
      {props.links.map(({ href, text }) => (
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
