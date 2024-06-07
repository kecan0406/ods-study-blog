import PostExcerpt from 'app/components/post-excerpt'
import { preloadViews } from 'app/components/view-counter'
import { Discussion } from 'utils/db/graphql'
import { getEdgePosts } from 'utils/db/querys'

export const experimental_ppr = true

const fetchPosts = async (): Promise<Discussion[]> => {
  const posts = await getEdgePosts()
  return posts.map(({ node }) => node)
}

export default async function WritingPage() {
  preloadViews()
  const posts = await fetchPosts()

  return (
    <article className='wrapper py-8'>
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
