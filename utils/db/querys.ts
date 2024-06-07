'use server'
import { unstable_noStore as noStore } from 'next/cache'
import {
  DiscussionsQuery,
  EdgeDiscussion,
  MemberStatusQuery,
  MemberStatuses,
  NearDiscussions,
  NearDiscussionsQuery,
  RepositoryDiscussions,
  UserStatus,
  githubClient,
} from 'utils/db/graphql'
import { db } from 'utils/db/kysely'

export const getPostsViews = async (): Promise<{ slug: number; views: number }[]> => {
  noStore()
  return await db.selectFrom('posts').select(['slug', 'views']).execute()
}

export const getUserStatuses = async (): Promise<UserStatus[]> => {
  const { data } = await githubClient.query<MemberStatuses>(MemberStatusQuery, { cursor: '' })
  return data!.organization.memberStatuses.nodes
}

export const getEdgePosts = async (): Promise<EdgeDiscussion[]> => {
  const { data } = await githubClient.query<RepositoryDiscussions>(DiscussionsQuery, { cursor: '' })
  return data!.repository.discussions.edges
}

export const getNearPosts = async (cursor: string): Promise<NearDiscussions> => {
  const { data } = await githubClient.query<NearDiscussions>(NearDiscussionsQuery, { cursor })
  return data!
}
