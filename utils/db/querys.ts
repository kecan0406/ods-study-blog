'use server'

import { unstable_noStore as noStore } from 'next/cache'
import { User, db } from 'utils/db/kysely'

export const getPostsCount = async (): Promise<{ slug: string; views: number }[]> => {
  noStore()
  return await db.selectFrom('posts').select(['slug', 'views']).execute()
}

export const getUsers = async (): Promise<User[]> => {
  return await db.selectFrom('users').select(['id', 'intro']).execute()
}
