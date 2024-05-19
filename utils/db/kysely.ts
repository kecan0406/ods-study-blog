import { createKysely } from '@vercel/postgres-kysely'
import { Generated } from 'kysely'

export interface PostsTable {
  id: Generated<number>
  title: string
  slug: string
  writer: string
  tags: string[]
  banner_url: string
  views: number
  created_at: Date
  updated_at: string
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
