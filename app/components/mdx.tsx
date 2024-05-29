import MdxHeadingLink from 'app/components/mdx-heading-link'
import { MDXComponents } from 'mdx/types'
import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote/rsc'
import Image from 'next/image'
import { AnchorHTMLAttributes, DetailedHTMLProps, HTMLAttributes, ImgHTMLAttributes, createElement } from 'react'
import { slugify } from 'utils/md-utils'

const a = ({ children, ...props }: DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>) => (
  <a {...props} href={props.href!}>
    {children}
  </a>
)

const img = ({ title, src, alt }: DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>) => (
  <figure>
    <Image src={src!} alt={alt!} height={376} width={768} title={title} />
    <figcaption>{title}</figcaption>
  </figure>
)

const headings =
  (type: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6') =>
  ({ children }: DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>) => {
    const id = slugify(children!.toString())
    return createElement(type, { id }, [MdxHeadingLink({ id })], children)
  }
const components: MDXComponents = {
  img,
  a,
  h1: headings('h1'),
  h2: headings('h2'),
  h3: headings('h3'),
  h4: headings('h4'),
  h5: headings('h5'),
  h6: headings('h6')
}

export default function PostMdxRemote(props: MDXRemoteProps) {
  return <MDXRemote {...props} components={{ ...components, ...(props.components || {}) }} />
}
