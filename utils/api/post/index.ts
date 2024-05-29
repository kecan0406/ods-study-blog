'use server'
import { POST_SLUGS, getMarkdownFile, parseMarkdown } from 'utils/md-utils'

export type PostMatter = {
  slug: string
  title: string
  writer: string
  tags: string[]
  image: string
  releaseDate: string
}
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
  const { content, matter } = getMarkdown(slug)
  return { matter, content }
}

const getMarkdown = (slug: string) => {
  const mdFile = getMarkdownFile(slug)
  return parseMarkdown(mdFile)
}
