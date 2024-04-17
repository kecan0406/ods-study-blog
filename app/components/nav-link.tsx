'use client'

import { Button } from 'app/components/ui/button'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type NavLinksProp = { links: { href: string; text: string }[] }
export default function NavLinks(props: NavLinksProp) {
  const pathName = usePathname()

  return (
    <div className='flex flex-grow items-center gap-1'>
      {props.links.map(({ href, text }) => {
        const isActive = pathName.startsWith(href)
        return (
          <Button variant='link' className={`h-10 p-3 font-bold${isActive ? 'underline' : ''}`} key={href}>
            <Link scroll={false} href={href}>
              {text}
            </Link>
          </Button>
        )
      })}
    </div>
  )
}
