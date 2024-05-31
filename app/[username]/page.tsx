import PostExcerpt from 'app/components/post-excerpt'
import { preloadViews } from 'app/components/view-counter'
import { Post, fetchPosts } from 'utils/api/post'
import { getUsers } from 'utils/db/querys'

export const experimental_ppr = true
export const dynamicParams = false

export async function generateStaticParams() {
  const users = await getUsers()
  return users.map((user) => ({ username: `@${user.id}` }))
}

const getPosts = async (userId: string): Promise<Post[]> => {
  const posts = await fetchPosts()
  return posts
    .filter((post) => post.matter.writer === userId)
    .toSorted((a, b) => new Date(b.matter.releaseDate).getTime() - new Date(a.matter.releaseDate).getTime())
}

export default async function UserPage({ params: { username } }: { params: { username: string } }) {
  preloadViews()
  const userId = decodeURIComponent(username).replace('@', '')
  const posts = await getPosts(userId)

  return (
    <article className='wrapper py-8'>
      <ul>
        {posts.map((post) => (
          <li className='mb-4' key={post.matter.slug}>
            <PostExcerpt post={post} />
          </li>
        ))}
      </ul>
    </article>
  )
}
