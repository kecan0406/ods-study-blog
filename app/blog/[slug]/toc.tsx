'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ArticleToc } from 'utils/api/blog'

export default function Toc({ toc }: { toc: ArticleToc }) {
  const [closestId, setClosestId] = useState<string>('')

  useEffect(() => {
    const proseHeadingEls = Array.from<HTMLHeadingElement>(
      document.querySelector('.prose')!.querySelectorAll('h2, h3, h4, h5, h6')
    )

    const handleClosestId = () => {
      const top = window.scrollY
      const heading = proseHeadingEls.reduce((preEl, curEl) =>
        Math.abs(curEl.offsetTop - top) < Math.abs(preEl.offsetTop - top) ? curEl : preEl
      )
      setClosestId(heading.id)
    }

    window.addEventListener('scroll', handleClosestId)
    return () => {
      window.removeEventListener('scroll', handleClosestId)
    }
  }, [])

  return (
    <div className='not-prose absolute start-full hidden h-full w-full max-w-52 py-20 pl-4 xl:block'>
      <aside className='sticky top-16 block overflow-hidden'>
        <nav className='flex flex-col gap-2'>
          {toc.map(({ depth, content, id }) => {
            const tocStyle = `opacity-${closestId === id ? 100 : 50} toc-h${depth}`
            return (
              <Link href={`#${id}`} key={`toc-${id}`} className={tocStyle}>
                {content}
              </Link>
            )
          })}
        </nav>
      </aside>
    </div>
  )
}
