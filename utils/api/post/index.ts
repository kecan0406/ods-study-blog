import { PostsTable } from 'utils/db/kysely'
import { getPostMetadata } from 'utils/db/querys'
import { POST_SLUGS, getMarkdownFile } from 'utils/md-utils'

export type PostMatter = Omit<PostsTable, 'id'>
export type Post = {
  matter: PostMatter
  content: string
}
export type PostContent = {
  id: string
  depth: number
  content: string
  children: PostContent[]
}

export const fetchPosts = async (): Promise<Post[]> => await Promise.all(POST_SLUGS.map((slug) => fetchPost(slug)))

export const fetchPost = async (slug: string): Promise<Post> => {
  return { matter: await getPostMetadata(slug), content: getMarkdownFile(slug) }
}
