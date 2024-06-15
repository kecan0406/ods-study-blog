import { preloadViews } from 'app/components/view-counter'
import { Discussion } from 'utils/db/graphql'
import { getDiscussions, getUserStatuses } from 'utils/db/querys'
import { WriterCard } from './writer-card'

export const experimental_ppr = true

const fetchPosts = async (): Promise<Discussion[]> => {
  const posts = await getDiscussions()
  return posts.map(({ node }) => node)
}

export default async function WriterPage() {
  preloadViews()
  const [users, posts] = await Promise.all([getUserStatuses(), fetchPosts()])

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
