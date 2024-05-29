import PostMdxRemote from 'app/components/mdx'
import { fetchPost, fetchPosts } from 'utils/api/post'
import { generateTOC, mdxRemoteOptions } from 'utils/md-utils'
import PostFooter from './post-footer'
import PostHeader, { preloadPostCount } from './post-header'
import Toc from './toc'

export const experimental_ppr = true
export const dynamicParams = false

export async function generateStaticParams() {
  const posts = await fetchPosts()
  return posts.map(({ matter }) => ({ username: `@${matter.writer}`, slug: matter.slug }))
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  preloadPostCount()
  const post = await fetchPost(params.slug)

  return (
    <article className='wrapper prose prose-zinc dark:prose-invert md:prose-lg relative py-8 prose-figcaption:mt-0 prose-headings:scroll-mt-16'>
      <Toc toc={generateTOC(post.content)} />
      <PostHeader matter={post.matter} />
      <hr className='mx-6 my-4 rounded border' />
      <PostMdxRemote options={mdxRemoteOptions} source={post.content} />
      <hr className='mx-6 my-4 rounded border' />
      <PostFooter slug={post.matter.slug} />
    </article>
  )
}
