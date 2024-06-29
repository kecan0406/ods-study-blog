import PostExcerpt from 'app/components/post-excerpt'
import { getPosts, getUserMessage } from 'utils/db/querys'
import { Post } from 'utils/gql/query'
import Profile from './profile'

export const experimental_ppr = true

const fetchPosts = async (username: string): Promise<Post[]> => {
  const posts = await getPosts()
  return posts.filter((post) => post.author.login === username)
}

export default async function UserPage({ params }: { params: { username: string } }) {
  const username = decodeURIComponent(params.username).replace('@', '')
  const [posts, userMessage] = await Promise.all([fetchPosts(username), getUserMessage(username)])
  return (
    <article className='wrapper py-4'>
      <Profile userMessage={userMessage} />
      <section className='py-4'>
        <h2 className='mb-2 font-bold text-2xl'>Posts</h2>
        <ul>
          {posts.map((post) => (
            <li className='mb-4' key={post.slug}>
              <PostExcerpt post={post} />
            </li>
          ))}
        </ul>
      </section>
    </article>
  )
}
