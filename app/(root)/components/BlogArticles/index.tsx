import { Article } from '@/utils/api/blog'
import BlogArticleExcerpt from './BlogArticleExcerpt'
import SectionTitle from '@/components/shared/SectionTitle'

export default function BlogArticles({ articles }: { articles: Article[] }) {
  return (
    <section className='pt-16'>
      <SectionTitle title='Featured Articles' href='blog' />
      <ul className='grid grid-cols-1 gap-4 p-2'>
        {articles.map((article) => (
          <BlogArticleExcerpt article={article} key={article.matter.slug} />
        ))}
      </ul>
    </section>
  )
}
