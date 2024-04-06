'use server'

import { db } from '@/lib/kysely'
import { unstable_noStore as noStore } from 'next/cache'

export const getPostCount = async (slug: string) => {
  noStore()
  const res = await db.selectFrom('posts').select('count').where('slug', '=', slug).execute()
  return res.length && res[0].count
}

export const getPostsCount = async () => {
  return await db.selectFrom('posts').select(['slug', 'count']).execute()
}
