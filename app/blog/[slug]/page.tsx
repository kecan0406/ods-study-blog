import BlogFooter from '@/app/blog/[slug]/blog-footer'
import BlogHeader from '@/app/blog/[slug]/blog-header'
import Toc from '@/app/blog/[slug]/toc'
import ArticleMdxRemote from '@/app/components/mdx'
import { Separator } from '@/app/components/ui/separator'
import { Article, ArticleToc, fetchArticle } from '@/utils/api/blog'
import { mdxRemoteOptions, parseToc } from '@/utils/md-utils'

const getArticle = async (slug: string): Promise<{ article: Article; toc: ArticleToc }> => {
  const article = await fetchArticle(slug)
  const toc = parseToc(article.content)
  return { article, toc }
}
export default async function Page({ params }: { params: { slug: string } }) {
  const { article, toc } = await getArticle(params.slug)
  return (
    <article className='flex flex-wrap'>
      <div className='flex-1' />
      <div className='wrapper py-8 prose prose-zinc md:prose-lg prose-headings:scroll-mt-16 dark:prose-invert prose-figcaption:mt-0'>
        <BlogHeader matter={article.matter} />
        <Separator className='my-4' />
        <ArticleMdxRemote options={mdxRemoteOptions} source={article.content} />
        <Separator className='my-4' />
        <BlogFooter slug={article.matter.slug} />
      </div>
      <div className='flex-1 min-w-0 pt-48'>
        <Toc toc={toc} />
      </div>
    </article>
  )
}
