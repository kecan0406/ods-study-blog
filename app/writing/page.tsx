import PostExcerpt from 'app/components/post-excerpt'
import { Post, fetchPosts } from 'utils/api/post'

const getPosts = async (): Promise<Post[]> => {
  const posts = await fetchPosts()
  return posts.toSorted((a, b) => new Date(b.matter.releaseDate).getTime() - new Date(a.matter.releaseDate).getTime())
}

export default async function WritingPage() {
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
