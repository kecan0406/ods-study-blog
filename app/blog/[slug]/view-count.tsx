import ViewCounter from '@/app/components/view-counter'
import { increment } from '@/utils/db/actions'
import { getPostsCount } from '@/utils/db/querys'

export default async function ViewCount({ slug }: { slug: string }) {
  const views = await getPostsCount()
  increment(slug)
  return <ViewCounter slug={slug} allViews={views} />
}
