import { ReactNode } from 'react'
import { getPosts } from 'utils/db/querys'

export const dynamicParams = false
export async function generateStaticParams() {
  const posts = await getPosts()
  return posts.map((post) => ({ username: `@${post.author.login}`, slug: String(post.slug) }))
}

export default function UserLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <>{children}</>
}
