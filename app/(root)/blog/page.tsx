import ArticleExcerpt from '@/components/article-excerpt'
import { Article, fetchArticles } from '@/utils/api/blog'

async function getArticles(): Promise<Article[]> {
  const articles = await fetchArticles()
  return articles.toSorted(
    (a, b) => new Date(b.matter.releaseDate).getTime() - new Date(a.matter.releaseDate).getTime()
  )
}

export default async function BlogPage() {
  const articles = await getArticles()

  return (
    <div className='wrapper'>
      <section className='py-8'>
        <ul className='grid grid-cols-1 gap-4'>
          {articles.map((article) => (
            <li key={article.matter.slug}>
              <ArticleExcerpt article={article} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
