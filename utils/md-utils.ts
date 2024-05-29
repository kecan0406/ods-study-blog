import fs from 'node:fs'
import { join } from 'path'
import { MDXRemoteProps } from 'next-mdx-remote/rsc'
import rehypePrettyCode from 'rehype-pretty-code'
import remarkUnwrapImages from 'remark-unwrap-images'
import { PostContent, PostMatter } from 'utils/api/post'

const POST_PATH = join(process.cwd(), 'posts')
const MD_REGEX = /\.mdx$/
export const POST_SLUGS = fs
  .readdirSync(POST_PATH)
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
export const getMarkdownFile = (slug: string) => fs.readFileSync(join(POST_PATH, `${slug}.mdx`), 'utf8')

const MATTER_REGEX = /---\s*([\s\S]*?)\s*---/
export const parseMarkdown = (mdFile: string) => {
  const matter = getMatter(mdFile)
  const content = removeMatter(mdFile)
  return { matter, content }
}
const getMatter = (mdFile: string) => {
  const lines = MATTER_REGEX.exec(mdFile)![1]
    .trim()
    .split('\n')
    .map((line) => line.split(': ')) as [keyof PostMatter, string][]
  return lines.reduce((pre, [key, val]) => {
    const value = val.trim()
    key === 'tags' ? (pre[key] = value.split(',')) : (pre[key] = value)
    return pre
  }, {} as PostMatter)
}
const removeMatter = (content: string) => content.replace(MATTER_REGEX, '')

const HEADER_REGEX = /(?<flag>#{1,6})\s+(?<content>.+)/g
export const generateTOC = (content: string): PostContent[] => {
  const toc: PostContent[] = Array.from(content.matchAll(HEADER_REGEX)).map(({ groups }) => ({
    id: slugify(groups!.content),
    depth: groups!.flag.length,
    content: groups!.content,
    children: []
  }))
  return buildTOCStructure(toc)
}
const buildTOCStructure = (toc: PostContent[]): PostContent[] => {
  toc.forEach((content, i) => {
    if (content.depth > toc[i + 1]?.depth) return

    const idx = toc.slice(i + 1).findIndex((sliceContent) => content.depth >= sliceContent.depth)
    const deleteCount = idx === -1 ? Infinity : idx
    content.children = buildTOCStructure(toc.splice(i + 1, deleteCount))
  })
  return toc
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
