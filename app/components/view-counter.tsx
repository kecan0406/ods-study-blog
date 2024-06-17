import { unstable_after as after } from 'next/server'
import { cache, use } from 'react'
import { incrementView } from 'utils/db/actions'
import { getPostsViews } from 'utils/db/querys'

export const preloadViews = cache(getPostsViews)

export function Views({ slug }: { slug: number }) {
  const views = use(preloadViews())
  return <ViewCounter slug={slug} allViews={views} />
}

const increment = cache(incrementView)
export function IncrementViews({ slug }: { slug: number }) {
  after(() => increment(slug))
  const views = use(preloadViews())
  return <ViewCounter slug={slug} allViews={views} />
}

type ViewCounterProps = { slug: number; allViews: { slug: number; views: number }[] }
async function ViewCounter({ slug, allViews }: ViewCounterProps) {
  const viewsForSlug = allViews && allViews.find((view) => view.slug === slug)
  const count = Number(viewsForSlug?.views || 0)

  return <span className='flex-grow px-1 text-right text-muted-foreground'>{count.toLocaleString()} views</span>
}
