import PostExcerpt, { preloadPostsCount } from 'app/components/post-excerpt'
import SectionTitle from 'app/components/shared/section-title'
import { Post, fetchPosts } from 'utils/api/post'

const getPosts = async (): Promise<Post[]> => {
  const posts = await fetchPosts()
  return posts.toSorted((a, b) => new Date(b.matter.releaseDate).getTime() - new Date(a.matter.releaseDate).getTime())
}

export default async function WritingPosts() {
  preloadPostsCount()
  const posts = await getPosts()

  return (
    <section className='py-8'>
      <SectionTitle title='Featured Posts' href='writing' />
      <ul>
        {posts.map((post) => (
          <li className='mb-4' key={post.matter.slug}>
            <PostExcerpt post={post} />
          </li>
        ))}
      </ul>
    </section>
  )
}
