import { Article, fetchArticles } from '@/utils/api/blog'
import BlogArticles from './components/BlogArticles'
import Profile from './components/Profile'

async function getArticles(): Promise<Article[]> {
  const articles = await fetchArticles()
  return articles.toSorted(
    (a, b) => new Date(b.matter.releaseDate).getTime() - new Date(a.matter.releaseDate).getTime()
  )
}

export default async function Page() {
  const articles = await getArticles()

  return (
    <div className='wrapper'>
      <Profile />
      <BlogArticles articles={articles} />
    </div>
  )
}
