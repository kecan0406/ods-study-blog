import { fetchArticle } from '@/utils/api/blog'
import { Typography } from '@/components/ui/typography'
import ArticleMdxRemote from '@/components/article-mdx'

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
      <Typography variant="h1">{article.title}</Typography>
      <ArticleMdxRemote source={article.content} />
    </div>
  )
}
