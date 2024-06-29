import { MDXRemoteProps } from 'next-mdx-remote/rsc'
import rehypePrettyCode from 'rehype-pretty-code'
import remarkUnwrapImages from 'remark-unwrap-images'

export const mdxRemoteOptions: MDXRemoteProps['options'] = {
  mdxOptions: {
    remarkPlugins: [remarkUnwrapImages],
    rehypePlugins: [
      [
        rehypePrettyCode,
        {
          theme: { dark: 'one-dark-pro', light: 'one-light' }
        } as import('rehype-pretty-code').Options
      ]
    ]
  }
}

export type PostContent = {
  id: string
  depth: number
  content: string
  children: PostContent[]
}
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
