import { ReactNode } from 'react'
import { fetchPosts } from 'utils/api/post'

export const dynamicParams = false

export async function generateStaticParams() {
  const posts = await fetchPosts()
  return posts.map(({ matter }) => ({ username: `@${matter.writer}`, slug: matter.slug }))
}

export default function PostLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <>{children}</>
}
