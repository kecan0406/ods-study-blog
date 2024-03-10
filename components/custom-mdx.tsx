import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote/rsc'
import { MDXComponents } from 'mdx/types'
import Link from 'next/link'

const components: MDXComponents = {
  a: ({ children, href }) => (
    <Link target="_blank" href={href!}>
      {children}
    </Link>
  ),
  h2: ({ children }) => <h2 className="p-2 text-xl">{children}</h2>
}

export default function CustomMdx({ source, ...props }: MDXRemoteProps) {
  return <MDXRemote {...props} components={components} source={source} />
}
