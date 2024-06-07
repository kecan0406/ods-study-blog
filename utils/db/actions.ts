'use server'
import { unstable_noStore as noStore } from 'next/cache'
import { db } from 'utils/db/kysely'

export const incrementView = async (slug: number) => {
  noStore()
  await db
    .insertInto('posts')
    .values({ slug, views: 1 })
    .onConflict((oc) =>
      oc.column('slug').doUpdateSet({
        views: (eb) => eb('posts.views', '+', 1),
      }),
    )
    .execute()
}
