'use server'
import { PostView } from 'app/components/view-counter'
import { unstable_noStore as noStore } from 'next/cache'
import { db } from 'utils/db/kysely'
import { gqlClient } from 'utils/gql/client'
import {
  Categories_Query,
  Post,
  PostCategory,
  Post_Query,
  Posts_Query,
  UserMessage,
  UserMessage_Query,
  UserMessages_Query
} from 'utils/gql/query'

export const getPostViews = async (): Promise<PostView[]> => {
  noStore()
  return await db.selectFrom('posts').select(['slug', 'views']).execute()
}

export const getUserMessages = async (): Promise<UserMessage[]> => {
  const { data } = await gqlClient.query(UserMessages_Query, {})
  return data!.organization.memberStatuses.nodes
}

export const getUserMessage = async (username: string): Promise<UserMessage> => {
  const { data } = await gqlClient.query(UserMessage_Query, { user: username })
  return data!.user.status
}

export const getPosts = async (categoryId: string | null = null): Promise<Post[]> => {
  const { data } = await gqlClient.query(Posts_Query, { categoryId })
  return data!.repository.discussions.nodes
}

export const getPost = async (slug: string | number): Promise<Post> => {
  const { data } = await gqlClient.query(Post_Query, { slug: Number(slug) })
  return data!.repository.discussion
}

export const getCategories = async (): Promise<PostCategory[]> => {
  const { data } = await gqlClient.query(Categories_Query, {})
  return data!.repository.discussionCategories.nodes
}
