import { createKysely } from '@vercel/postgres-kysely'
import { Generated } from 'kysely'

interface PostsTable {
  slug: number
  views: number
}

interface UsersTable {
  user_id: Generated<number>
  id: string
  node_id: string
}
export type User = Omit<UsersTable, 'user_id'>

export interface Database {
  posts: PostsTable
  users: UsersTable
}

export const db = createKysely<Database>()
export { sql } from 'kysely'
