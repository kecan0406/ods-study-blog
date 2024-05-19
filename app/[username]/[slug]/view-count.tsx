import ViewCounter from 'app/components/view-counter'
import { incrementView } from 'utils/db/actions'
import { getPostViews } from 'utils/db/querys'

export default async function ViewCount({ slug }: { slug: string }) {
  const views = await getPostViews()
  incrementView(slug)
  return <ViewCounter slug={slug} allViews={views} />
}
