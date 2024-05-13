import { POST_SLUGS, getMarkdownFile, parseContent, parseMatter } from 'utils/md-utils'

export type PostMatter = {
  slug: string
  title: string
  writer: string
  tags: string[]
  image: string
  readingTime: string
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

export const fetchPosts = async (): Promise<Post[]> => {
  return await Promise.all(POST_SLUGS.map((slug) => fetchPost(slug, true)))
}

export const fetchPost = async (slug: string, excerpt: boolean = false): Promise<Post> => {
  const { content, matter } = getMarkdown(slug, excerpt)
  return { matter, content }
}

const getMarkdown = (slug: string, excerpt: boolean) => {
  const markdown = getMarkdownFile(slug)
  const { matter, content } = parseMatter(markdown)
  return { matter, content: parseContent(content, excerpt) }
}
