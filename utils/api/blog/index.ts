import * as fs from 'node:fs'
import { join } from 'path'
import matter from 'gray-matter'

export type Article = {
  name: string
  title: string
  content: string
  releaseDate: string
}

const ARTICLE_DIR = join(process.cwd(), 'lib/blog')
export const fetchArticles = async (): Promise<Article[]> => {
  const files = fs.readdirSync(ARTICLE_DIR).map(file => file.replace('.md', ''))
  const articles = await Promise.all(files.map(slug => fetchArticle(slug)))

  return articles.toSorted(
    (a, b) =>
      new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
  )
}

export const fetchArticle = async (slug: string): Promise<Article> => {
  const markdown = fs.readFileSync(`${ARTICLE_DIR}/${slug}.md`, 'utf8')
  const { data, content } = matter(markdown)

  return {
    name: data.slug,
    title: data.title,
    content,
    releaseDate: data.releaseDate
  }
}
