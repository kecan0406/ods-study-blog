import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote/rsc'
import { MDXComponents } from 'mdx/types'
import Link from 'next/link'
import { Typography } from '@/components/ui/typography'
import remarkGfm from 'remark-gfm'
import remarkUnwrapImages from 'remark-unwrap-images'
import Image from 'next/image'

const components: MDXComponents = {
  img: ({ src, alt, title }) => {
    return (
      <figure>
        <Image src={src!} alt={alt!} height={376} width={752} />
        {title && (
          <Typography variant="mutedText" as="figcaption">
            {title}
          </Typography>
        )}
      </figure>
    )
  },
  a: ({ children, href }) => {
    return (
      <Link
        href={href!}
        className="text-primary underline-offset-4 hover:underline"
      >
        {children}
      </Link>
    )
  },
  h1: ({ children }) => {
    return <Typography variant="h1">{children}</Typography>
  },
  h2: ({ children }) => {
    return <Typography variant="h2">{children}</Typography>
  },
  h3: ({ children }) => {
    return <Typography variant="h3">{children}</Typography>
  },
  h4: ({ children }) => {
    return <Typography variant="h4">{children}</Typography>
  },
  h5: ({ children }) => {
    return <Typography variant="h5">{children}</Typography>
  },
  h6: ({ children }) => {
    return <Typography variant="h6">{children}</Typography>
  },
  p: ({ children }) => {
    return <Typography variant="p">{children}</Typography>
  },
  blockquote: ({ children }) => {
    return <Typography variant="blockquote">{children}</Typography>
  },
  code: ({ children }) => {
    return <Typography variant="inlineCode">{children}</Typography>
  },
  ul: ({ children }) => {
    return <Typography variant="ul">{children}</Typography>
  },
  ol: ({ children }) => {
    return <Typography variant="ol">{children}</Typography>
  }
}

export default function ArticleMdxRemote({ source }: MDXRemoteProps) {
  return (
    <MDXRemote
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm, remarkUnwrapImages],
          rehypePlugins: []
        }
      }}
      components={components}
      source={source}
    />
  )
}
