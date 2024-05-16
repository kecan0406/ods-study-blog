import ViewCounter from 'app/components/view-counter'
import { incrementView } from 'utils/db/actions'
import { getPostsCount } from 'utils/db/querys'

export default async function ViewCount({ slug }: { slug: string }) {
  const views = await getPostsCount()
  incrementView(slug)
  return <ViewCounter slug={slug} allViews={views} />
}
