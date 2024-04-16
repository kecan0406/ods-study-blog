import fs from 'node:fs'
import { join } from 'path'
import remarkGfm from 'remark-gfm'
import remarkUnwrapImages from 'remark-unwrap-images'
import { MDXRemoteProps } from 'remote-mdx/rsc'
import RemoveMarkdown from 'remove-markdown'
import { ArticleToc, FrontMatterArticle } from 'utils/api/blog'

const ARTICLE_PATH = join(process.cwd(), 'content')
const MD_REGEX = /\.mdx?$/
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

const MATTER_REGEX = /---\s*([\s\S]*?)\s*---/
export const parseFrontMatter = (fileContent: string) => {
  const lines = MATTER_REGEX.exec(fileContent)![1]
    .trim()
    .split('\n')
    .map((line) => line.split(':')) as [keyof FrontMatterArticle, string][]

  const matter = lines.reduce((pre, [key, val]) => {
    const value = val.trim()
    key === 'tags' ? (pre[key] = value.split(',')) : (pre[key] = value)
    return pre
  }, {} as FrontMatterArticle)

  const content = fileContent.replace(MATTER_REGEX, '').trim()
  matter.readingTime = readingTime(content)
  return { matter, content }
}

const HEADER_REGEX = /(?<flag>#{1,6})\s+(?<content>.+)/g
export const parseToc = (content: string): ArticleToc => {
  return Array.from(content.matchAll(HEADER_REGEX)).map(({ groups }) => {
    const { flag, content } = groups!
    return {
      depth: flag.length,
      content,
      id: slugify(content)
    }
  })
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

export const slugify = (str: string) => {
  return str
    .toLowerCase()
    .trim()
    .replace(/&/g, '-and-')
    .replace(/[^\w-]+/g, '')
    .replace(/\-\-+/g, '-')
}
