import ArticleExcerpt from 'app/components/article-excerpt'
import { Article, fetchArticles } from 'utils/api/blog'
import SearchTags from './search-tags'

const getArticles = async (tags: string[]): Promise<Article[]> => {
  const articles = await fetchArticles()
  return articles
    .filter((a) => tags.every((tag) => a.matter.tags.includes(tag)))
    .toSorted((a, b) => new Date(b.matter.releaseDate).getTime() - new Date(a.matter.releaseDate).getTime())
}

export default async function BlogPage({ searchParams }: { searchParams: { tags?: string } }) {
  const tags = searchParams.tags ? searchParams.tags.split(',') : []
  const articles = await getArticles(tags)
  return (
    <div className='wrapper'>
      <section className='py-8'>
        <SearchTags tags={tags} />
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
