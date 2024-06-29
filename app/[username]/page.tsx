import PostExcerpt from 'app/components/post-excerpt'
import { getPosts } from 'utils/db/querys'
import { Post } from 'utils/gql/query'

export const experimental_ppr = true

const fetchPosts = async (userId: string): Promise<Post[]> => {
  const posts = await getPosts()
  return posts.filter((post) => post.author.login === userId)
}

export default async function UserPage({ params: { username } }: { params: { username: string } }) {
  const userId = decodeURIComponent(username).replace('@', '')
  const posts = await fetchPosts(userId)

  return (
    <article className='wrapper py-4'>
      <ul>
        {posts.map((post) => (
          <li className='mb-4' key={post.slug}>
            <PostExcerpt post={post} />
          </li>
        ))}
      </ul>
    </article>
  )
}
