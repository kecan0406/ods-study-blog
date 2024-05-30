import PostExcerpt from 'app/components/post-excerpt'
import { preloadViews } from 'app/components/view-counter'
import { Post, fetchPosts } from 'utils/api/post'

export const experimental_ppr = true

const getPosts = async (): Promise<Post[]> => {
  const posts = await fetchPosts()
  return posts.toSorted((a, b) => new Date(b.matter.releaseDate).getTime() - new Date(a.matter.releaseDate).getTime())
}

export default async function WritingPage() {
  preloadViews()
  const posts = await getPosts()

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
