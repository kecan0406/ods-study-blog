import { preloadViews } from 'app/components/view-counter'
import { Discussion } from 'utils/db/graphql'
import { getEdgePosts, getUserStatuses } from 'utils/db/querys'
import { WriterCard } from './writer-card'

export const experimental_ppr = true

const fetchPosts = async (): Promise<Discussion[]> => {
  const posts = await getEdgePosts()
  return posts.map(({ node }) => node)
}

export default async function WriterPage() {
  preloadViews()
  const [users, posts] = await Promise.all([getUserStatuses(), fetchPosts()])

  return (
    <div className='wrapper py-8'>
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
