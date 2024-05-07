import fs from 'node:fs'
import { join } from 'path'
import { MDXRemoteProps } from 'next-mdx-remote/rsc'
import rehypePrettyCode from 'rehype-pretty-code'
import remarkUnwrapImages from 'remark-unwrap-images'
import RemoveMarkdown from 'remove-markdown'
import { ArticleContent, FrontMatterArticle } from 'utils/api/blog'

const ARTICLE_PATH = join(process.cwd(), 'content')
const MD_REGEX = /\.mdx$/
export const articleSlugs = fs
  .readdirSync(ARTICLE_PATH)
  .filter((path) => MD_REGEX.test(path))
  .map((path) => path.replace(MD_REGEX, ''))

export const mdxRemoteOptions: MDXRemoteProps['options'] = {
  mdxOptions: {
    remarkPlugins: [remarkUnwrapImages],
    rehypePlugins: [
      [
        rehypePrettyCode,
        {
          theme: {
            dark: 'one-dark-pro',
            light: 'one-light'
          }
        } as import('rehype-pretty-code').Options
      ]
    ]
  }
}
export const getMarkdownFile = (slug: string): string => {
  return fs.readFileSync(join(ARTICLE_PATH, `${slug}.mdx`), 'utf8')
}

const MATTER_REGEX = /---\s*([\s\S]*?)\s*---/
export const parseFrontMatter = (fileContent: string) => {
  const lines = MATTER_REGEX.exec(fileContent)![1]
    .trim()
    .split('\n')
    .map((line) => line.split(': ')) as [keyof FrontMatterArticle, string][]

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
export const parseTOC = (content: string): ArticleContent[] => {
  const articleToc: ArticleContent[] = Array.from(content.matchAll(HEADER_REGEX)).map(({ groups }) => ({
    id: slugify(groups!.content),
    depth: groups!.flag.length,
    content: groups!.content,
    children: []
  }))
  return parseChildren(articleToc)
}
const parseChildren = (toc: ArticleContent[]): ArticleContent[] => {
  toc.forEach((articleTitle, i) => {
    if (articleTitle.depth > toc[i + 1]?.depth) return
    const nextToc = toc.splice(
      i + 1,
      toc.slice(i + 1).findIndex((sliceToc) => articleTitle.depth >= sliceToc.depth)
    )
    articleTitle.children = parseChildren(nextToc)
  })
  return toc
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

// https://github.com/leerob/leerob.io/blob/main/app/components/mdx.tsx#L121 에서 참고했습니다.
export const slugify = (str: string) => {
  return str
    .toLowerCase()
    .trim()
    .replace(/&/g, '-and-')
    .replace(/[^\w\p{Script=Hangul}-]+/gu, '') // -를 제외한 모든 단어가 아닌 문자 제거
    .replace(/\-\-+/g, '-')
}
