'use client'
import { ArticleToc } from '@/utils/api/blog'
import { throttle } from '@/utils/utils'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Toc({ toc }: { toc: ArticleToc }) {
  const [closestId, setClosestId] = useState<string>('')

  useEffect(() => {
    const prose = document.querySelector('.prose')!
    const headings = Array.from<HTMLElement>(prose.querySelectorAll('h2, h3, h4, h5, h6')).map((heading) => ({
      id: heading.id,
      top: heading.offsetTop
    }))

    const handleClosestId = throttle(() => {
      const proseTop = Math.abs(prose.getBoundingClientRect().top - 128)
      const closestId = headings.reduce((pre, cur) => {
        return Math.abs(cur.top - proseTop) < Math.abs(pre.top - proseTop) ? cur : pre
      }, headings[0]).id
      setClosestId(closestId)
    }, 150)

    window.addEventListener('scroll', handleClosestId)
    return () => {
      window.removeEventListener('scroll', handleClosestId)
    }
  }, [])

  return (
    <aside className='pl-12 top-16 block sticky overflow-hidden'>
      <nav className='flex flex-col gap-2'>
        {toc.map(({ depth, content, id }) => {
          const active = closestId === id ? 100 : 50
          return (
            <Link href={`#${id}`} key={`toc-${id}`} className={`opacity-${active} toc-h${depth}`}>
              {content}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
