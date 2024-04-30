'use client'

import { buttonVariants } from 'app/components/ui/button'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type NavLinksProp = { links: { href: string; text: string }[] }
export default function NavLinks(props: NavLinksProp) {
  const pathName = usePathname()

  return (
    <div className='flex flex-grow items-center gap-1'>
      {props.links.map(({ href, text }) => {
        const underline = pathName.startsWith(href)
        return (
          <Link
            className={buttonVariants({ variant: 'link', className: { underline } })}
            scroll={false}
            href={href}
            key={href}
          >
            {text}
          </Link>
        )
      })}
    </div>
  )
}
