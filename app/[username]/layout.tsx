import { ReactNode } from 'react'
import { getDiscussions } from 'utils/db/querys'

export const dynamicParams = false
export async function generateStaticParams() {
  const posts = await getDiscussions()
  return posts.map((post) => ({ username: `@${post.node.author.login}`, slug: String(post.node.slug) }))
}

export default function UserLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <>{children}</>
}
