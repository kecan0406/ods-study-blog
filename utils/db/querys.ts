'use server'
import { unstable_noStore as noStore } from 'next/cache'
import { db } from 'utils/db/kysely'
import gqlClient from 'utils/gql/client'
import { CategoriesQuery, Category, Post, PostQuery, PostsQuery, UserMessage, UserMessagesQuery } from '../gql/query'

export const getPostsViews = async (): Promise<{ slug: number; views: number }[]> => {
  noStore()
  return await db.selectFrom('posts').select(['slug', 'views']).execute()
}

export const getUserStatuses = async (): Promise<UserMessage[]> => {
  const { data } = await gqlClient.query(UserMessagesQuery, {})
  return data!.organization.memberStatuses.nodes
}

export const getPosts = async (categoryId: string | null = null): Promise<Post[]> => {
  const { data } = await gqlClient.query(PostsQuery, { categoryId })
  return data!.repository.discussions.nodes
}

export const getPost = async (slug: string | number): Promise<Post> => {
  const { data } = await gqlClient.query(PostQuery, { slug: Number(slug) })
  return data!.repository.discussion
}

export const getCategories = async (): Promise<Category[]> => {
  const { data } = await gqlClient.query(CategoriesQuery, {})
  return data!.repository.discussionCategories.nodes
}
