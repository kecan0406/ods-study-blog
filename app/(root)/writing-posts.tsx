import PostExcerpt from 'app/components/post-excerpt'
import { buttonVariants } from 'app/components/ui/button'
import { preloadViews } from 'app/components/view-counter'
import Link from 'next/link'
import { Discussion } from 'utils/db/graphql'
import { getEdgePosts } from 'utils/db/querys'

const fetchPosts = async (): Promise<Discussion[]> => {
  const posts = await getEdgePosts()
  return posts.map(({ node }) => node)
}

export default async function WritingPosts() {
  preloadViews()
  const posts = await fetchPosts()

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
