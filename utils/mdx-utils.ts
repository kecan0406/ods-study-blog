import { join } from 'path'
import fs from 'node:fs'
import remarkGfm from 'remark-gfm'
import remarkUnwrapImages from 'remark-unwrap-images'
import { MDXRemoteProps } from 'next-mdx-remote/rsc'
export const MD_REGEX = /\.mdx?$/
export const ARTICLE_PATH = join(process.cwd(), 'lib/blog')

export const articleSlugs = fs
  .readdirSync(ARTICLE_PATH)
  .filter(path => MD_REGEX.test(path))
  .map(path => path.replace(MD_REGEX, ''))

export const mdxRemoteOptions: MDXRemoteProps['options'] = {
  mdxOptions: {
    remarkPlugins: [remarkGfm, remarkUnwrapImages],
    rehypePlugins: []
  }
}
