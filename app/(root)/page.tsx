import { Article, fetchArticles } from '@/utils/api/blog'
import BlogArticles from './blog-articles'
import Profile from './profile'

const getArticles = async (): Promise<Article[]> => {
  const articles = await fetchArticles()
  return articles.toSorted(
    (a, b) => new Date(b.matter.releaseDate).getTime() - new Date(a.matter.releaseDate).getTime()
  )
}

export default async function Page() {
  const articles = await getArticles()

  return (
    <div className='wrapper py-8'>
      <Profile />
      <BlogArticles articles={articles} />
    </div>
  )
}
