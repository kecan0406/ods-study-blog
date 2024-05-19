'use server'
import { unstable_noStore as noStore } from 'next/cache'
import { db } from 'utils/db/kysely'

export const incrementView = async (slug: string) => {
  noStore()

  await db
    .updateTable('posts')
    .set('views', (eb) => eb('views', '+', 1))
    .where('slug', '=', slug)
    .execute()
}
