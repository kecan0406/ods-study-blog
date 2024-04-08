'use server'

import { db } from '@/utils/kysely'
import { unstable_noStore as noStore } from 'next/cache'
export const getPostsCount = async (): Promise<{ slug: string; count: number }[]> => {
  noStore()
  return await db.selectFrom('posts').select(['slug', 'count']).execute()
}
