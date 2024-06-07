import Link, { LinkProps } from 'next/link'
import { HTMLProps } from 'react'

type PostLinkProps = { writer: string; slug?: number } & Omit<LinkProps, 'href'> & HTMLProps<HTMLAnchorElement>
export default function PostLink({ writer, slug, children, ...props }: PostLinkProps) {
  return (
    <Link {...props} href={`/@${writer}/${slug ?? ''}`}>
      {children}
    </Link>
  )
}
