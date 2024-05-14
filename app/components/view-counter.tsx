type ViewCounterProps = { slug: string; allViews: { slug: string; count: number }[] }
export default async function ViewCounter({ slug, allViews }: ViewCounterProps) {
  const viewsForSlug = allViews && allViews.find((view) => view.slug === slug)
  const count = Number(viewsForSlug?.count || 0)

  return <span className='flex-grow px-1 text-right'>{count.toLocaleString()} views</span>
}
