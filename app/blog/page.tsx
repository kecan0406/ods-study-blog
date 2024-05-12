import ArticleExcerpt from 'app/components/article-excerpt'
import { Article, fetchArticles } from 'utils/api/blog'

const getArticles = async (): Promise<Article[]> => {
  const articles = await fetchArticles()
  return articles.toSorted(
    (a, b) => new Date(b.matter.releaseDate).getTime() - new Date(a.matter.releaseDate).getTime()
  )
}

export default async function BlogPage() {
  const articles = await getArticles()
  return (
    <article className='wrapper py-8'>
      <ul>
        {articles.map((article) => (
          <li className='mb-4' key={article.matter.slug}>
            <ArticleExcerpt article={article} />
          </li>
        ))}
      </ul>
    </article>
  )
}
