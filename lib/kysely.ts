import { createKysely } from '@vercel/postgres-kysely'
import { Generated } from 'kysely'

interface PostsTable {
  id: Generated<number>
  slug: string
  count: number
}

export interface Database {
  posts: PostsTable
}

export const db = createKysely<Database>()
export { sql } from 'kysely'
