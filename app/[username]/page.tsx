import PostExcerpt from 'app/components/post-excerpt'
import { Post, fetchPosts } from 'utils/api/post'
import { getUsers } from 'utils/db/querys'

export const dynamicParams = false
export async function generateStaticParams() {
  const users = await getUsers()
  return users.map(({ username }) => ({ username: `@${username}` }))
}

const getPosts = async (username: string): Promise<Post[]> => {
  const posts = await fetchPosts()
  return posts
    .filter((post) => post.matter.writer === username)
    .toSorted((a, b) => new Date(b.matter.releaseDate).getTime() - new Date(a.matter.releaseDate).getTime())
}

export default async function UserPage({ params: { username } }: { params: { username: string } }) {
  const posts = await getPosts(decodeURIComponent(username).replace('@', ''))

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
