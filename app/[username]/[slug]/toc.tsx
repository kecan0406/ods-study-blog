'use client'
import { clsx } from 'clsx'
import { useEffect, useState } from 'react'
import { PostContent } from 'utils/api/post'

type TocContent = { id: string; y: number }
export default function Toc({ toc }: { toc: PostContent[] }) {
  const [parentClosestId, setParentClosestId] = useState<string>('')
  const [closestId, setClosestId] = useState<string>('')

  useEffect(() => {
    const parseChildren = (toc: PostContent[]): TocContent[] =>
      toc.flatMap(({ id, children }) => [{ id, y: document.getElementById(id)!.offsetTop }, ...parseChildren(children)])
    const tocInfo = toc.map(({ id, children }) => ({
      id,
      y: document.getElementById(id)!.offsetTop,
      children: parseChildren(children)
    }))

    const findClosestId = (toc: TocContent[]) => toc.findLast((content) => content.y - 114 < window.scrollY)?.id ?? ''
    const handleClosestIdx = () => {
      const closestId = findClosestId(tocInfo)
      setParentClosestId(closestId)
      const childrenToc = tocInfo.find((info) => info.id === closestId)?.children
      childrenToc && setClosestId(findClosestId(childrenToc))
    }

    window.addEventListener('scroll', handleClosestIdx)
    return () => window.removeEventListener('scroll', handleClosestIdx)
  }, [])

  return (
    <aside className='not-prose absolute start-full mx-4 hidden h-full min-w-56 py-20 xl:block'>
      <nav className='sticky top-20 overflow-hidden'>
        <ul className='toc-anchor truncate text-muted-foreground' anchor={`toc-${parentClosestId}`}>
          {toc.map(({ children, content, id }) => {
            return (
              <li className='ps-2' id={`toc-${id}`} key={`toc-${id}`}>
                <a
                  href={`#${id}`}
                  className={clsx(
                    'p-2 text-lg hover:font-bold hover:text-foreground',
                    parentClosestId === id && 'font-bold text-foreground'
                  )}
                >
                  {content}
                </a>
                <TocHeader toc={children} closestId={closestId} />
              </li>
            )
          })}
        </ul>
      </nav>
    </aside>
  )
}

function TocHeader({ toc, closestId }: { toc: PostContent[]; closestId: string }) {
  if (!toc.length) return
  return (
    <ul>
      {toc.map(({ content, id, children }) => {
        return (
          <li className='ps-2' key={`toc-${id}`}>
            <a
              href={`#${id}`}
              className={clsx(
                'p-2 text-base hover:font-semibold hover:text-foreground',
                closestId === id && 'font-semibold text-foreground'
              )}
            >
              {content}
            </a>
            <TocHeader toc={children} closestId={closestId} />
          </li>
        )
      })}
    </ul>
  )
}
