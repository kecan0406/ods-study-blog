'use server'
import { unstable_noStore as noStore } from 'next/cache'
import { db } from 'utils/db/kysely'

export const increment = async (slug: string) => {
  noStore()

  await db
    .insertInto('posts')
    .values({ slug, count: 1 })
    .onConflict((oc) =>
      oc.column('slug').doUpdateSet({
        count: (eb) => eb('posts.count', '+', 1)
      })
    )
    .execute()
}
