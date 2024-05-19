'use server'

import { unstable_noStore as noStore } from 'next/cache'
import { PostMatter } from 'utils/api/post'
import { db } from 'utils/db/kysely'

export const getPostViews = async (): Promise<{ slug: string; views: number }[]> => {
  noStore()
  return await db.selectFrom('posts').select(['slug', 'views']).execute()
}

export const getUsers = async (): Promise<{ username: string; intro: string }[]> => {
  return await db.selectFrom('users').select(['username', 'intro']).execute()
}

export const getPostMetadata = async (slug: string): Promise<PostMatter> => {
  const res: PostMatter[] = await db.selectFrom('posts').selectAll().where('slug', '=', slug).execute()
  return res[0]
}
