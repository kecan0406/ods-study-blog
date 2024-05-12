import ArticleMdxRemote from 'app/components/mdx'
import { Article, fetchArticle, fetchArticles } from 'utils/api/blog'
import { mdxRemoteOptions, parseTOC } from 'utils/md-utils'
import BlogFooter from './blog-footer'
import BlogHeader from './blog-header'
import Toc from './toc'

export const dynamicParams = false
export async function generateStaticParams() {
  const articles = await fetchArticles()
  return articles.map(({ matter }) => ({ username: `@${matter.writer}`, slug: matter.slug }))
}

const getArticle = async (slug: string): Promise<Article> => await fetchArticle(slug)

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const article = await getArticle(params.slug)
  return (
    <article className='wrapper prose prose-zinc dark:prose-invert md:prose-lg relative py-8 prose-figcaption:mt-0 prose-headings:scroll-mt-16'>
      <Toc toc={parseTOC(article.content)} />
      <BlogHeader matter={article.matter} />
      <hr className='mx-6 my-4 rounded border' />
      <ArticleMdxRemote options={mdxRemoteOptions} source={article.content} />
      <hr className='mx-6 my-4 rounded border' />
      <BlogFooter slug={article.matter.slug} />
    </article>
  )
}
