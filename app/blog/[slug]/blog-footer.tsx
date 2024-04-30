import Link from 'next/link'
import { Article, fetchArticles } from 'utils/api/blog'
import Comments from './comments'

const getArticles = async (): Promise<Article[]> => {
  const articles = await fetchArticles()
  return articles.toSorted(
    (a, b) => new Date(b.matter.releaseDate).getTime() - new Date(a.matter.releaseDate).getTime()
  )
}

export default async function BlogFooter({ slug }: { slug: string }) {
  return (
    <div className='not-prose'>
      <NavPost slug={slug} />
      <Comments />
    </div>
  )
}

async function NavPost({ slug }: { slug: string }) {
  const articles = await getArticles()
  const curIdx = articles.findIndex((article) => article.matter.slug === slug)
  const prev = articles[curIdx - 1]
  const next = articles[curIdx + 1]
  return (
    <div className='grid grid-cols-2 py-4 text-center'>
      <div>
        <p className='font-bold'>이전 글</p>
        {prev && (
          <Link className='p-3 opacity-50 hover:opacity-100' href={`/blog/${prev.matter.slug}`}>
            {prev.matter.title}
          </Link>
        )}
      </div>
      <div>
        <p className='font-bold'>다음 글</p>
        {next && (
          <Link className='p-3 opacity-50 hover:opacity-100' href={`/blog/${next.matter.slug}`}>
            {next.matter.title}
          </Link>
        )}
      </div>
    </div>
  )
}
