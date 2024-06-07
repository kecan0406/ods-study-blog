import { cacheExchange, createClient, fetchExchange } from '@urql/core'
import { registerUrql } from '@urql/next/rsc'

export const githubClient = registerUrql(() =>
  createClient({
    url: 'https://api.github.com/graphql',
    exchanges: [cacheExchange, fetchExchange],
    fetchOptions: () => ({ headers: { Authorization: `Bearer ${process.env.GITHUB_AUTH}` } }),
  }),
).getClient()

export type UserStatus = { user: { login: string }; emojiHTML: string; message: string }
export type MemberStatuses = { organization: { memberStatuses: { nodes: UserStatus[] } } }
export const MemberStatusQuery = `{
  organization(login: "ODS-GARAGE") {
    memberStatuses(first: 10) {
      nodes {
        user {
          login
        }
        emojiHTML
        message
      }
    }
  }
}`
