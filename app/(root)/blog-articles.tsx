import ArticleExcerpt from 'app/components/article-excerpt'
import SectionTitle from 'app/components/shared/SectionTitle'
import { Article } from 'utils/api/blog'

export default function BlogArticles({ articles }: { articles: Article[] }) {
  return (
    <section className='py-8'>
      <SectionTitle title='Featured Articles' href='blog' />
      <ul className='grid grid-cols-1 gap-4'>
        {articles.map((article) => (
          <li key={article.matter.slug}>
            <ArticleExcerpt article={article} />
          </li>
        ))}
      </ul>
    </section>
  )
}
