import BlogFooter from 'app/blog/[slug]/blog-footer'
import BlogHeader from 'app/blog/[slug]/blog-header'
import Toc from 'app/blog/[slug]/toc'
import ArticleMdxRemote from 'app/components/mdx'
import { Separator } from 'app/components/ui/separator'
import { Article, fetchArticle } from 'utils/api/blog'
import { mdxRemoteOptions, parseTOC } from 'utils/md-utils'

const getArticle = async (slug: string): Promise<Article> => await fetchArticle(slug)

export default async function Page({ params }: { params: { slug: string } }) {
  const article = await getArticle(params.slug)
  return (
    <article className='wrapper prose prose-zinc dark:prose-invert md:prose-lg relative py-8 prose-figcaption:mt-0 prose-headings:scroll-mt-16'>
      <Toc toc={parseTOC(article.content)} />
      <BlogHeader matter={article.matter} />
      <Separator className='my-4' />
      <ArticleMdxRemote options={mdxRemoteOptions} source={article.content} />
      <Separator className='my-4' />
      <BlogFooter slug={article.matter.slug} />
    </article>
  )
}
