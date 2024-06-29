import { unstable_after as after } from 'next/server'
import { cache, use } from 'react'
import { incrementView } from 'utils/db/actions'
import { getPostViews } from 'utils/db/querys'

export type PostView = { slug: number; views: number }

const postViews = cache(getPostViews)
export function Views({ slug }: { slug: number }) {
  const views = use(postViews())
  return <ViewCounter slug={slug} allPostViews={views} />
}

const increment = cache(incrementView)
export function IncrementViews({ slug }: { slug: number }) {
  after(() => increment(slug))
  const views = use(postViews())
  return <ViewCounter slug={slug} allPostViews={views} />
}

type ViewCounterProps = { slug: number; allPostViews: PostView[] }
async function ViewCounter({ slug, allPostViews }: ViewCounterProps) {
  const viewsForSlug = allPostViews && allPostViews.find((view) => view.slug === slug)
  const count = Number(viewsForSlug?.views ?? 0)

  return <span className='flex-grow px-1 text-right text-muted-foreground'>{count.toLocaleString()} views</span>
}
