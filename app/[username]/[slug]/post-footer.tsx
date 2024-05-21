import PostLink from 'app/components/shared/post-link'
import { Post, fetchPosts } from 'utils/api/post'
import Comments from './comments'

const getPosts = async (): Promise<Post[]> => {
  const posts = await fetchPosts()
  return posts.toSorted((a, b) => new Date(b.matter.releaseDate).getTime() - new Date(a.matter.releaseDate).getTime())
}

export default async function PostFooter({ slug }: { slug: string }) {
  return (
    <div className='not-prose'>
      <NavPost slug={slug} />
      <Comments />
    </div>
  )
}

async function NavPost({ slug }: { slug: string }) {
  const posts = await getPosts()
  const curIdx = posts.findIndex((post) => post.matter.slug === slug)
  const prev = posts[curIdx - 1]
  const next = posts[curIdx + 1]

  return (
    <div className='grid grid-cols-2 py-4 text-center'>
      <div>
        <p className='font-bold'>이전 글</p>
        {prev && (
          <PostLink className='p-3 opacity-50 hover:opacity-100' writer={prev.matter.writer} slug={prev.matter.slug}>
            {prev.matter.title}
          </PostLink>
        )}
      </div>
      <div>
        <p className='font-bold'>다음 글</p>
        {next && (
          <PostLink className='p-3 opacity-50 hover:opacity-100' writer={next.matter.writer} slug={next.matter.slug}>
            {next.matter.title}
          </PostLink>
        )}
      </div>
    </div>
  )
}
