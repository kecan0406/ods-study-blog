'use server'

import { unstable_noStore as noStore } from 'next/cache'
import { User, db } from 'utils/db/kysely'

export const getPostsCount = async (): Promise<{ slug: string; views: number }[]> => {
  noStore()
  return await db.selectFrom('posts').select(['slug', 'views']).execute()
}

export const getUsers = async (): Promise<User[]> => {
  return await db.selectFrom('users').select(['id', 'node_id']).execute()
}

export type GithubStatus = { login: string; status: { emojiHTML?: string; message?: string } | null }
export const getGithubStatus = async (): Promise<GithubStatus[]> => {
  noStore()
  const users = await getUsers()
  const { data }: { data: { nodes: GithubStatus[] } } = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_AUTH}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: `{nodes(ids: ${JSON.stringify(
        users.map(({ node_id }) => node_id)
      )}) {... on User {login status {emojiHTML message}}}}`
    })
  }).then((res) => res.json())

  return data.nodes
}
