import { graphql } from './client'

export type PostCategory = { emoji: string; slug: string; id: string }
const PostCategory_Fragment = graphql<PostCategory>`
    fragment PostCategoryFragment on DiscussionCategory {
        emoji: emojiHTML
        slug
        id
    }
`

export type PostLabel = { name: string; color: string }
export type Post = {
  author: { login: string }
  slug: number
  createdAt: string
  title: string
  category: PostCategory
  labels: { nodes: PostLabel[] }
  body: string
}
const Post_Fragment = graphql<Post>`
    fragment PostFragment on Discussion {
        author {
            login
        }
        slug: number
        createdAt
        title
        category {
            ${PostCategory_Fragment}
        }
        labels(first: 10) {
            nodes {
                name
                color
            }
        }
        body
    }
`

export type UserMessage = { user: { login: string; name: string; bio: string }; emoji: string; message: string }

const UserMessage_Fragment = graphql<UserMessage>`
    fragment UserMessage on UserStatus {
        user {
            login
            name
            bio
        }
        emoji: emojiHTML
        message
    }
`

export type SocialProvider =
  | 'GENERIC'
  | 'FACEBOOK'
  | 'INSTAGRAM'
  | 'LINKEDIN'
  | 'MASTODON'
  | 'REDDIT'
  | 'TWITCH'
  | 'TWITTER'
  | 'YOUTUBE'
  | 'NPM'
export type UserSocial = { url: string; provider: SocialProvider }
export const UserSocialList_Query = graphql<{ user: { socialAccounts: { nodes: UserSocial[] } } }>`
    query UserSocialList($user: String!) {
        user(login: $user) {
            socialAccounts(first: 10) {
                nodes {
                    provider
                    url
                }
            }
        }
    }
`

export const UserMessage_Query = graphql<{ user: { status: UserMessage } }>`
    query UserMessageQuery($user: String!) {
        user(login: $user) {
            status {
                ${UserMessage_Fragment}
            }
        }
    }
`

export const UserMessages_Query = graphql<{ organization: { memberStatuses: { nodes: UserMessage[] } } }>`
    query UserMessagesQuery {
        organization(login: "ODS-GARAGE") {
            memberStatuses(first: 10) {
                nodes {
                    ${UserMessage_Fragment}
                }
            }
        }
    }
`

export const Posts_Query = graphql<{ repository: { discussions: { nodes: Post[] } } }>`
    query PostsQuery($categoryId: ID) {
        repository(owner: "ODS-GARAGE", name: "posts") {
            discussions(first: 10, categoryId: $categoryId) {
                nodes {
                    ${Post_Fragment}
                }
            }
        }
    }
`

export const Post_Query = graphql<{ repository: { discussion: Post } }>`
    query PostQuery($slug: Int!) {
        repository(owner: "ODS-GARAGE", name: "posts") {
            discussion(number: $slug) {
                ${Post_Fragment}
            }
        }
    }
`

export const Categories_Query = graphql<{ repository: { discussionCategories: { nodes: PostCategory[] } } }>`
    query CategoriesQuery {
        repository(owner: "ODS-GARAGE", name: "posts") {
            discussionCategories(first: 10) {
                nodes {
                    ${PostCategory_Fragment}
                }
            }
        }
    }
`
