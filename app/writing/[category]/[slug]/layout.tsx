import { ReactNode } from 'react'
import { getPosts } from 'utils/db/querys'

export const dynamicParams = false
export async function generateStaticParams() {
  const posts = await getPosts()
  return posts.map((post) => ({ slug: String(post.slug) }))
}

export default function PostLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <>{children}</>
}
