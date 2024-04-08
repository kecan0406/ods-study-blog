import { FrontMatterArticle } from '@/utils/api/blog'
import { MDXRemoteProps } from 'next-mdx-remote/rsc'
import fs from 'node:fs'
import { join } from 'path'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import remarkUnwrapImages from 'remark-unwrap-images'
import RemoveMarkdown from 'remove-markdown'

const ARTICLE_PATH = join(process.cwd(), 'content')
const MD_REGEX = /\.mdx?$/
export const articleSlugs = fs
  .readdirSync(ARTICLE_PATH)
  .filter((path) => MD_REGEX.test(path))
  .map((path) => path.replace(MD_REGEX, ''))

export const mdxRemoteOptions: MDXRemoteProps['options'] = {
  mdxOptions: {
    remarkPlugins: [remarkGfm, remarkUnwrapImages],
    rehypePlugins: [rehypeSlug]
  }
}

export const getMarkdownFile = (slug: string): string => {
  return fs.readFileSync(join(ARTICLE_PATH, `${slug}.md`), 'utf8')
}

const MATTER_REGEX = /---\s*([\s\S]*?)\s*---/
export const parseFrontMatter = (fileContent: string) => {
  const matter = {} as FrontMatterArticle
  const lines = MATTER_REGEX.exec(fileContent)![1].trim().split('\n')
  lines.forEach((line) => {
    const [key, val] = line.split(':') as [keyof FrontMatterArticle, string]
    matter[key] = val.trim()
  })

  const content = fileContent.replace(MATTER_REGEX, '').trim()
  matter.readingTime = readingTime(content)
  return { matter, content }
}

const WORDS_PER_MINUTE = 200
const readingTime = (context: string) => {
  const wordCount = RemoveMarkdown(context).match(/\w+/g)?.length ?? 0
  return Math.ceil(wordCount / WORDS_PER_MINUTE).toString()
}

export const parseContent = (content: string, excerpt: boolean) => {
  if (!excerpt) return content
  const maxChars = 200
  const text = RemoveMarkdown(content)
  return text.slice(0, maxChars).replace(' ', '\n')
}
