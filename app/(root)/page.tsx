import { Article, fetchArticles } from '@/utils/api/blog'
import Profile from './components/Profile'
import BlogArticles from './components/BlogArticles'

async function getArticles(): Promise<Article[]> {
  const articles = await fetchArticles()
  return articles.toSorted(
    (a, b) =>
      new Date(b.matter.releaseDate).getTime() -
      new Date(a.matter.releaseDate).getTime()
  )
}

export default async function Page() {
  const articles = await getArticles()

  return (
    <div className="wrapper p-16">
      <Profile />
      <BlogArticles articles={articles} />
    </div>
  )
}
