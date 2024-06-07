import { cacheExchange, createClient, fetchExchange, gql } from '@urql/next'
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
export const MemberStatusQuery = gql`
query ($cursor: String) {
  organization(login: "ODS-GARAGE") {
    memberStatuses(first: 10, after: $cursor) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        user {
          login
        }
        emojiHTML
        message
      }
    }
  }
}
`

export type Author = { login: string }
export type Category = { emojiHTML: string; name: string }
export type Label = { name: string }
export type Discussion = {
  author: Author
  slug: number
  createdAt: string
  title: string
  category: Category
  labels: { nodes: Label[] }
  body: string
}
export type EdgeDiscussion = { cursor: string; node: Discussion }
export type RepositoryDiscussions = { repository: { discussions: { edges: EdgeDiscussion[] } } }
export const DiscussionsQuery = gql`
query ($cursor: String) {
  repository(owner: "ODS-GARAGE", name: "posts") {
    discussions(first: 10, after: $cursor) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        cursor
        node {
          author {
            login
          }
          slug: number
          createdAt
          title
          category {
            emojiHTML
            name
          }
          labels(first: 10) {
            nodes {
              name
            }
          }
          body
        }
      }
    }
  }
}
`

export type NearDiscussions = {
  repository: {
    prev: { nodes: DiscussionInfo[] }
    next: { nodes: DiscussionInfo[] }
  }
}
export type DiscussionInfo = { author: Author; title: string; slug: number }
export const NearDiscussionsQuery = gql`
query ($cursor: String) {
  repository(owner: "ODS-GARAGE", name: "posts") {
    next: discussions(last: 1, before: $cursor) {
      nodes {
        author {
          login
        }
        title
        slug: number
      }
    }
    prev: discussions(first: 1, after: $cursor) {
      nodes {
        author {
          login
        }
        title
        slug: number
      }
    }
  }
}`
