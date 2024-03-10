import { MDXRemote } from 'next-mdx-remote/rsc'
import { fetchArticle } from '@/utils/api/blog'

export default async function Page({ params }: { params: { slug: string } }) {
  const article = await fetchArticle(params.slug)

  return (
    <div className="wrapper p-16">
      <time
        className="text-xs text-muted-foreground"
        dateTime={article.releaseDate}
      >
        {article.releaseDate}
      </time>
      <h2 className="text-4xl">{article.title}</h2>
      <MDXRemote source={article.content} />
    </div>
  )
}
