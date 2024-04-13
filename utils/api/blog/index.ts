import { articleSlugs, getMarkdownFile, parseContent, parseFrontMatter } from '@/utils/md-utils'

export type FrontMatterArticle = {
  slug: string
  title: string
  writer: string
  readingTime: string
  releaseDate: string
}
export type Article = {
  matter: FrontMatterArticle
  content: string
}
export type ArticleToc = {
  depth: number
  content: string
  id: string
}[]

export const fetchArticles = async (): Promise<Article[]> => {
  return await Promise.all(articleSlugs.map((slug) => fetchArticle(slug, true)))
}

export const fetchArticle = async (slug: string, excerpt: boolean = false): Promise<Article> => {
  const { content, matter } = getMarkdown(slug, excerpt)
  return { matter, content }
}

const getMarkdown = (slug: string, excerpt: boolean) => {
  const markdown = getMarkdownFile(slug)
  const { matter, content } = parseFrontMatter(markdown)
  return { matter, content: parseContent(content, excerpt) }
}
