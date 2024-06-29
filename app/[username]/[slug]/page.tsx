import PostMdxRemote from 'app/components/mdx'
import { getPost } from 'utils/db/querys'
import { generateTOC, mdxRemoteOptions } from 'utils/md-utils'
import PostFooter from './post-footer'
import PostHeader from './post-header'
import Toc from './toc'

export const experimental_ppr = true

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug)

  return (
    <article className='wrapper prose prose-zinc dark:prose-invert md:prose-lg relative py-8 prose-figcaption:mt-0 prose-headings:scroll-mt-16'>
      <Toc toc={generateTOC(post.body)} />
      <PostHeader post={post} />
      <hr className='mx-6 my-4 rounded border' />
      <PostMdxRemote options={mdxRemoteOptions} source={post.body} />
      <hr className='mx-6 my-4 rounded border' />
      <PostFooter />
    </article>
  )
}
