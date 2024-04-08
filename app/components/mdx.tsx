import MdxHeadingLink from '@/app/components/mdx-heading-link'
import { MDXComponents } from 'mdx/types'
import Image from 'next/image'
import Link from 'next/link'
import { ReactNode, createElement } from 'react'
import { MDXRemote, MDXRemoteProps } from 'remote-mdx/rsc'

type HeadingProps = { children?: ReactNode; id?: string }
const headings = (type: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6') => {
  const Heading = ({ children, id }: HeadingProps) => createElement(type, { id }, [MdxHeadingLink({ id })], children)
  Heading.displayName = type
  return Heading
}

const components: MDXComponents = {
  img: ({ src, alt, title, ...props }) => {
    if (!title) {
      return <Image src={src!} alt={alt!} height={376} width={768} />
    }

    return (
      <figure>
        <Image src={src!} alt={alt!} height={376} width={768} title={title} />
        <figcaption>{title}</figcaption>
      </figure>
    )
  },
  a: ({ children, ...props }) => {
    return (
      <Link {...props} href={props.href!}>
        {children}
      </Link>
    )
  },
  h1: headings('h1'),
  h2: headings('h2'),
  h3: headings('h3'),
  h4: headings('h4'),
  h5: headings('h5'),
  h6: headings('h6')
}

export default function ArticleMdxRemote(props: MDXRemoteProps) {
  return <MDXRemote {...props} components={{ ...components, ...(props.components || {}) }} />
}
