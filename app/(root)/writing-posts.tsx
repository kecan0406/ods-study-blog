import PostExcerpt from 'app/components/post-excerpt'
import SectionTitle from 'app/components/shared/section-title'
import { Post } from 'utils/api/post'

export default function WritingPosts({ posts }: { posts: Post[] }) {
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
