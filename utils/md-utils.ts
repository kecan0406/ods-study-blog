import { join } from 'path'
import fs from 'node:fs'
import remarkGfm from 'remark-gfm'
import remarkUnwrapImages from 'remark-unwrap-images'
import { MDXRemoteProps } from 'next-mdx-remote/rsc'
import RemoveMarkdown from 'remove-markdown'
import { FrontMatterArticle } from '@/utils/api/blog'

const MD_REGEX = /\.mdx?$/
const MATTER_REGEX = /---\s*([\s\S]*?)\s*---/

const ARTICLE_PATH = join(process.cwd(), 'lib/blog')

export const articleSlugs = fs
  .readdirSync(ARTICLE_PATH)
  .filter((path) => MD_REGEX.test(path))
  .map((path) => path.replace(MD_REGEX, ''))

export const mdxRemoteOptions: MDXRemoteProps['options'] = {
  mdxOptions: {
    remarkPlugins: [remarkGfm, remarkUnwrapImages],
    rehypePlugins: []
  }
}

export const getMarkdownFile = (slug: string): string => {
  return fs.readFileSync(join(ARTICLE_PATH, `${slug}.md`), 'utf8')
}

export const parseFrontMatter = (fileContent: string) => {
  const content = fileContent.replace(MATTER_REGEX, '').trim()
  const matter = {} as FrontMatterArticle

  const lines = MATTER_REGEX.exec(fileContent)![1].trim().split('\n')
  lines.forEach((line) => {
    const [key, val] = line.split(':') as [keyof FrontMatterArticle, string]
    matter[key] = val.trim()
  })

  return { matter, content }
}

export const parseContent = (content: string, excerpt: boolean) => {
  if (!excerpt) return content
  const maxChars = 200
  const text = RemoveMarkdown(content)
  return text.slice(0, maxChars).replace(' ', '\n')
}
