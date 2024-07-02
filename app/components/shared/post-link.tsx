import Link, { LinkProps } from 'next/link'
import { HTMLProps } from 'react'

type PostLinkProps = { category: string; slug?: number } & Omit<LinkProps, 'href'> & HTMLProps<HTMLAnchorElement>
export default function PostLink({ category, slug, children, ...props }: PostLinkProps) {
  return (
    <Link {...props} href={`/writing/${category}/${slug ?? ''}`} aria-label={`${category} ${slug ?? ''}`}>
      {children}
    </Link>
  )
}
