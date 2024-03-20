import { Article, fetchArticles } from '@/utils/api/blog'
import ArticleExcerpt from './components/ArticleExcerpt'
import SectionTitle from '@/components/shared/SectionTitle'

async function getArticles(): Promise<Article[]> {
  const articles = await fetchArticles()
  return articles.toSorted(
    (a, b) => new Date(b.matter.releaseDate).getTime() - new Date(a.matter.releaseDate).getTime()
  )
}

export default async function BlogPage() {
  const articles = await getArticles()

  return (
    <div className='wrapper p-16'>
      <SectionTitle title='Featured Articles' />
      <ul className='grid grid-cols-1 gap-4 p-2'>
        {articles.map((article) => (
          <ArticleExcerpt article={article} key={article.matter.slug} />
        ))}
      </ul>
    </div>
  )
}
