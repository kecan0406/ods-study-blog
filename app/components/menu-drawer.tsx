'use client'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import { clsx } from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { MdFormatListBulleted } from 'react-icons/md'
import { Button } from './ui/button'

const LINKS = [
  { href: '', text: 'HOME' },
  { href: 'writer', text: 'Writer' },
  { href: 'writing', text: 'Writing' }
]

export default function MenuDrawer() {
  const anchor = usePathname().split('/')[1]

  return (
    <>
      <Button
        variant='ghost'
        className='rounded-full md:hidden'
        size='icon'
        popoverTarget='menu-drawer'
        onClick={() => disableBodyScroll(document.body)}
      >
        <MdFormatListBulleted className='size-6' />
      </Button>
      <div
        className='fixed top-0 left-0 size-full p-0'
        popover=''
        id='menu-drawer'
        ref={(ref) => {
          return () => {
            ref?.hidePopover()
            enableBodyScroll(document.body)
          }
        }}
      >
        <header className='wrapper absolute top-0 left-0 flex h-12 items-center justify-end'>
          <Button
            variant='ghost'
            className='rounded-full'
            size='icon'
            popoverTarget='menu-drawer'
            onClick={() => enableBodyScroll(document.body)}
          >
            <MdFormatListBulleted className='size-6' />
          </Button>
        </header>
        <nav className='size-full text-2xl'>
          <ul className='flex h-full flex-col items-center justify-center space-y-3'>
            {LINKS.map(({ href, text }) => {
              const isActive = href === (anchor.startsWith('@') ? 'writer' : anchor)

              return (
                <li key={href}>
                  <Link
                    className={clsx(
                      'h-9 px-4 py-2 transition-opacity hover:opacity-100',
                      isActive ? 'font-bold opacity-100' : 'opacity-50'
                    )}
                    href={`/${href}`}
                  >
                    {text}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </>
  )
}
