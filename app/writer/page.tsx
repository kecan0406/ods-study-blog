import { preloadViews } from 'app/components/view-counter'
import { Post, fetchPosts } from 'utils/api/post'
import { getUsers } from 'utils/db/querys'
import { WriterCard } from './writer-card'

export const experimental_ppr = true

const getPosts = async (): Promise<Post[]> => {
  const posts = await fetchPosts()
  return posts.toSorted((a, b) => new Date(b.matter.releaseDate).getTime() - new Date(a.matter.releaseDate).getTime())
}

export default async function WriterPage() {
  preloadViews()
  const [users, posts] = await Promise.all([getUsers(), getPosts()])

  return (
    <div className='wrapper py-8'>
      <ul>
        {users.map((user) => (
          <li key={user.id} className='mb-4'>
            <WriterCard user={user} posts={posts.filter((post) => post.matter.writer === user.id)} />
          </li>
        ))}
      </ul>
    </div>
  )
}
