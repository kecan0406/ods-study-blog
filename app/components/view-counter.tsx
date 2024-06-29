import { unstable_after as after } from 'next/server'
import { cache, use } from 'react'
import { incrementView } from 'utils/db/actions'
import { getPostViews } from 'utils/db/querys'

export type PostView = { slug: number; views: number }
const getCount = (slug: number, allPostViews: PostView[]): number => {
  const viewsForSlug = allPostViews && allPostViews.find((view) => view.slug === slug)
  return Number(viewsForSlug?.views ?? 0)
}

const getPostViewsCache = cache(getPostViews)
const incrementCache = cache(incrementView)

type ViewsProps = { slug: number; increment?: boolean }
export function Views({ slug, increment }: ViewsProps) {
  const views = use(getPostViewsCache())
  let count = getCount(slug, views)

  increment && (count += 1)
  increment && after(() => incrementCache(slug))

  return <span className='flex-grow px-1 text-right text-muted-foreground'>{count.toLocaleString()} views</span>
}
