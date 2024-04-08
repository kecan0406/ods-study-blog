import BlogHeader from '@/app/blog/[slug]/blog-header'
import ArticleMdxRemote from '@/app/components/mdx'
import { Separator } from '@/app/components/ui/separator'
import { fetchArticle } from '@/utils/api/blog'
import { mdxRemoteOptions } from '@/utils/md-utils'

export default async function Page({ params }: { params: { slug: string } }) {
  const { matter, content } = await fetchArticle(params.slug)

  return (
    <article className='wrapper py-8 prose prose-zinc md:prose-lg dark:prose-invert prose-figcaption:mt-0'>
      <BlogHeader matter={matter} />
      <Separator className='my-4' />
      <ArticleMdxRemote options={mdxRemoteOptions} source={content} />
    </article>
  )
}
