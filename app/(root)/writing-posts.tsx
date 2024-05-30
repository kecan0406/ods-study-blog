import PostExcerpt from 'app/components/post-excerpt'
import { buttonVariants } from 'app/components/ui/button'
import { preloadViews } from 'app/components/view-counter'
import Link from 'next/link'
import { Post, fetchPosts } from 'utils/api/post'

const getPosts = async (): Promise<Post[]> => {
  const posts = await fetchPosts()
  return posts.toSorted((a, b) => new Date(b.matter.releaseDate).getTime() - new Date(a.matter.releaseDate).getTime())
}

export default async function WritingPosts() {
  preloadViews()
  const posts = await getPosts()

  return (
    <section className='py-8'>
      <div className='flex justify-between'>
        <Link href='/writing' className={buttonVariants({ variant: 'link', className: 'mb-2' })}>
          <h2 className='text-2xl'>Featured Posts</h2>
        </Link>
      </div>
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
