import PostExcerpt from 'app/components/post-excerpt'
import { preloadViews } from 'app/components/view-counter'
import { Discussion } from 'utils/db/graphql'
import { getDiscussions, getUserStatuses } from 'utils/db/querys'

export const experimental_ppr = true
export const dynamicParams = false

export async function generateStaticParams() {
  const users = await getUserStatuses()
  return users.map((user) => ({ username: `@${user.user.login}` }))
}

const fetchPosts = async (userId: string): Promise<Discussion[]> => {
  const posts = await getDiscussions()
  return posts.filter((post) => post.node.author.login === userId).map(({ node }) => node)
}

export default async function UserPage({ params: { username } }: { params: { username: string } }) {
  preloadViews()
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
