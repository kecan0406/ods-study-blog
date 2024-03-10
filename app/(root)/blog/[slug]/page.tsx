import { fetchArticle } from '@/utils/api/blog'
import CustomMdx from '@/components/custom-mdx'

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
      <h1 className="text-4xl">{article.title}</h1>
      <CustomMdx source={article.content} />
    </div>
  )
}
