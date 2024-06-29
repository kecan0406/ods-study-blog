import PostExcerpt from 'app/components/post-excerpt'
import { buttonVariants } from 'app/components/ui/button'
import Link from 'next/link'
import { getPosts } from 'utils/db/querys'

export default async function WritingPosts() {
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
          <li className='mb-4' key={post.slug}>
            <PostExcerpt post={post} />
          </li>
        ))}
      </ul>
    </section>
  )
}
