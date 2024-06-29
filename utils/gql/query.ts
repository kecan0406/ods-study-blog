import { TypedDocumentNode } from '@urql/core/dist/urql-core-chunk'
import { gql } from '@urql/next'

const graphql = <T>(strings: TemplateStringsArray, ...fragments: TypedDocumentNode[]) => {
  const combineFragments = fragments.map((fragment) => fragment.loc?.source.body).join('')
  const query = strings
    .map((line, i) => {
      if (!!fragments[i]) {
        return line + `...${fragments[i].definitions.at(-1)!.name.value}`
      }
      return line
    })
    .join('')

  return gql<T>`
        ${combineFragments}
        ${query}
    `
}

export type Category = { emoji: string; slug: string; id: string }
const PostCategoryFragment = graphql<Category>`
    fragment PostCategoryFragment on DiscussionCategory {
        emoji: emojiHTML
        slug
        id
    }
`

export type Post = {
  author: { login: string }
  slug: number
  createdAt: string
  title: string
  category: Category
  labels: { nodes: { name: string }[] }
  body: string
}
const PostFragment = graphql<Post>`
    fragment PostFragment on Discussion {
        author {
            login
        }
        slug: number
        createdAt
        title
        category {
            ${PostCategoryFragment}
        }
        labels(first: 10) {
            nodes {
                name
            }
        }
        body
    }
`

export type UserMessage = { user: { login: string }; emoji: string; message: string }
export const UserMessagesQuery = graphql<{ organization: { memberStatuses: { nodes: UserMessage[] } } }>`
    query UserMessagesQuery {
        organization(login: "ODS-GARAGE") {
            memberStatuses(first: 10) {
                nodes {
                    user {
                        login
                    }
                    emoji: emojiHTML
                    message
                }
            }
        }
    }
`

export const PostsQuery = graphql<{ repository: { discussions: { nodes: Post[] } } }>`
    query PostsQuery($categoryId: ID) {
        repository(owner: "ODS-GARAGE", name: "posts") {
            discussions(first: 10, categoryId: $categoryId) {
                nodes {
                    ${PostFragment}
                }
            }
        }
    }
`

export const PostQuery = graphql<{ repository: { discussion: Post } }>`
    query PostQuery($slug: Int!) {
        repository(owner: "ODS-GARAGE", name: "posts") {
            discussion(number: $slug) {
                ${PostFragment}
            }
        }
    }
`

export const CategoriesQuery = graphql<{ repository: { discussionCategories: { nodes: Category[] } } }>`
    query CategoriesQuery {
        repository(owner: "ODS-GARAGE", name: "posts") {
            discussionCategories(first: 10) {
                nodes {
                    ${PostCategoryFragment}
                }
            }
        }
    }
`
