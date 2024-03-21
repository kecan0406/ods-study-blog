import MdxHeadingLink from '@/components/mdx-heading-link'
import { Typography } from '@/components/ui/typography'
import { MDXComponents } from 'mdx/types'
import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote/rsc'
import Image from 'next/image'
import Link from 'next/link'
import { ReactNode } from 'react'

type HeadingProps = { children?: ReactNode; id?: string }
const headings = (as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6') => {
  const Heading = ({ children, id }: HeadingProps) => (
    <Typography id={id} variant={as}>
      <MdxHeadingLink id={id} />
      {children}
    </Typography>
  )
  Heading.displayName = as
  return Heading
}

const components: MDXComponents = {
  img: ({ src, alt, title }) => {
    return (
      <figure>
        <Image src={src!} alt={alt!} height={376} width={752} />
        {title && (
          <Typography variant='mutedText' as='figcaption'>
            {title}
          </Typography>
        )}
      </figure>
    )
  },
  a: ({ children, href }) => {
    return (
      <Link href={href!} className='text-primary underline-offset-4 hover:underline'>
        {children}
      </Link>
    )
  },
  h1: headings('h1'),
  h2: headings('h2'),
  h3: headings('h3'),
  h4: headings('h4'),
  h5: headings('h5'),
  h6: headings('h6'),
  p: ({ children }) => {
    return <Typography variant='p'>{children}</Typography>
  },
  blockquote: ({ children }) => {
    return <Typography variant='blockquote'>{children}</Typography>
  },
  code: ({ children }) => {
    return <Typography variant='inlineCode'>{children}</Typography>
  },
  ul: ({ children }) => {
    return <Typography variant='ul'>{children}</Typography>
  },
  ol: ({ children }) => {
    return <Typography variant='ol'>{children}</Typography>
  }
}

export default function ArticleMdxRemote(props: MDXRemoteProps) {
  return <MDXRemote {...props} components={{ ...components, ...(props.components || {}) }} />
}
