'use server'
import { unstable_noStore as noStore } from 'next/cache'
import {
  CategoriesQuery,
  Category,
  DiscussionsQuery,
  EdgeDiscussion,
  MemberStatusQuery,
  NearDiscussions,
  NearDiscussionsQuery,
  UserStatus,
  githubClient
} from 'utils/db/graphql'
import { db } from 'utils/db/kysely'

export const getPostsViews = async (): Promise<{ slug: number; views: number }[]> => {
  noStore()
  return await db.selectFrom('posts').select(['slug', 'views']).execute()
}

export const getUserStatuses = async (): Promise<UserStatus[]> => {
  const { data } = await githubClient.query(MemberStatusQuery, { cursor: '' })
  return data!.organization.memberStatuses.nodes
}

export const getDiscussions = async (categoryId: string | null = null): Promise<EdgeDiscussion[]> => {
  const { data } = await githubClient.query(DiscussionsQuery, { cursor: '', categoryId })
  return data!.repository.discussions.edges
}

export const getNearPosts = async (cursor: string): Promise<NearDiscussions> => {
  const { data } = await githubClient.query(NearDiscussionsQuery, { cursor })
  return data!
}

export const getCategories = async (): Promise<Category[]> => {
  const { data } = await githubClient.query(CategoriesQuery, { cursor: '' })
  return data!.repository.discussionCategories.edges.map(({ node }) => node)
}
