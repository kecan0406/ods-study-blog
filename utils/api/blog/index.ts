import * as fs from 'node:fs'
import { join } from 'path'
import matter from 'gray-matter'
import { ARTICLE_PATH, articleSlugs } from '@/utils/mdx-utils'

export type Article = {
  slug: string
  title: string
  content: string
  releaseDate: string
}

export const fetchArticles = async (): Promise<Article[]> => {
  return await Promise.all(articleSlugs.map(slug => fetchArticle(slug)))
}

export const fetchArticle = async (slug: string): Promise<Article> => {
  const markdown = fs.readFileSync(join(ARTICLE_PATH, `${slug}.md`), 'utf8')
  const { data, content } = matter(markdown)

  return {
    slug: data.slug,
    title: data.title,
    content,
    releaseDate: data.releaseDate
  }
}
