import ArticleExcerpt from 'app/components/article-excerpt'
import { Article, fetchArticles } from 'utils/api/blog'
import { getUsers } from 'utils/db/querys'

export const dynamicParams = false
export async function generateStaticParams() {
  const users = await getUsers()
  return users.map(({ username }) => ({ username: `@${username}` }))
}

const getArticles = async (username: string): Promise<Article[]> => {
  const articles = await fetchArticles()
  return articles
    .filter((article) => article.matter.writer === username)
    .toSorted((a, b) => new Date(b.matter.releaseDate).getTime() - new Date(a.matter.releaseDate).getTime())
}

export default async function UserPage({ params: { username } }: { params: { username: string } }) {
  const articles = await getArticles(username.replace('%40', ''))
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
