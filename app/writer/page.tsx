import { getPosts, getUserStatuses } from 'utils/db/querys'
import { WriterCard } from './writer-card'

export const experimental_ppr = true

export default async function WriterPage() {
  const [users, posts] = await Promise.all([getUserStatuses(), getPosts()])

  return (
    <div className='wrapper py-4'>
      <ul>
        {users.map(({ user }) => (
          <li key={user.login} className='mb-4'>
            <WriterCard user={user.login} posts={posts.filter((post) => post.author.login === user.login)} />
          </li>
        ))}
      </ul>
    </div>
  )
}
