'use server'

import { unstable_noStore as noStore } from 'next/cache'
import { db } from 'utils/db/kysely'
export const getPostsCount = async (): Promise<{ slug: string; count: number }[]> => {
  noStore()
  return await db.selectFrom('posts').select(['slug', 'count']).execute()
}
