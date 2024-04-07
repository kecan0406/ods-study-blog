type ViewCounterProps = { slug: string; allViews: { slug: string; count: number }[] }
const ViewCounter = async ({ slug, allViews }: ViewCounterProps) => {
  const viewsForSlug = allViews && allViews.find((view) => view.slug === slug)
  const count = Number(viewsForSlug?.count || 0)

  return <>{count.toLocaleString()} views</>
}

export default ViewCounter
