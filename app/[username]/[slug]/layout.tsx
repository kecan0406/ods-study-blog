import { ReactNode } from 'react'
import { getEdgePosts } from 'utils/db/querys'

export const dynamicParams = false
export async function generateStaticParams() {
  const posts = await getEdgePosts()
  return posts.map((post) => ({ username: `@${post.node.author.login}`, slug: String(post.node.slug) }))
}

export default function PostLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <>{children}</>
}
