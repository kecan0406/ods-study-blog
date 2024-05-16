import { createKysely } from '@vercel/postgres-kysely'
import { Generated } from 'kysely'

interface PostsTable {
  id: Generated<number>
  slug: string
  count: number
}

interface UsersTable {
  id: Generated<number>
  username: string
  intro: string
}

export interface Database {
  posts: PostsTable
  users: UsersTable
}

export const db = createKysely<Database>()
export { sql } from 'kysely'
