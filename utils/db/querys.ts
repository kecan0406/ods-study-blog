'use server'

import { unstable_noStore as noStore } from 'next/cache'
import { User, db } from 'utils/db/kysely'

export const getPostsCount = async (): Promise<{ slug: string; views: number }[]> => {
  noStore()
  return await db.selectFrom('posts').select(['slug', 'views']).execute()
}

export const getUsers = async (): Promise<User[]> => {
  return await db.selectFrom('users').select(['id', 'intro']).execute()
}

const translateEmoji = async (alias: string): Promise<string> => {
  const emojis: { [emoji: string]: string } = await fetch('https://api.github.com/emojis', {
    cache: 'force-cache'
  }).then((res) => res.json())
  const url = emojis[alias.replaceAll(':', '')]

  return url.includes('unicode') ? String.fromCodePoint(parseInt(url.split('/').at(-1)!, 16)) : url
}

type UserStatus = { emoji?: string; message?: string }
export const getGithubStatus = async (): Promise<UserStatus[]> => {
  noStore()
  const users = await getUsers()
  let { data } = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_AUTH}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: `{${users.reduce(
        (pre, { id }) => pre.concat(`${id}: user(login: "kecan0406") {status {emoji message}}`),
        ''
      )}}`
    })
  }).then((res) => res.json())

  return users.map(async ({ id }) => {
    if (data[id].status?.emoji) data[id].status.emoji = await translateEmoji(data[id].status.emoji)
    return data[id].status
  }) as UserStatus[]
}
