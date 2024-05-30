import { cache } from 'react'
import { getPostsCount } from 'utils/db/querys'

export const preloadViews = cache(getPostsCount)

export async function Views({ slug }: { slug: string }) {
  const views = await preloadViews()
  return <ViewCounter slug={slug} allViews={views} />
}

type ViewCounterProps = { slug: string; allViews: { slug: string; views: number }[] }
async function ViewCounter({ slug, allViews }: ViewCounterProps) {
  const viewsForSlug = allViews && allViews.find((view) => view.slug === slug)
  const count = Number(viewsForSlug?.views || 0)

  return <span className='flex-grow px-1 text-right text-muted-foreground'>{count.toLocaleString()} views</span>
}
