import { Article, fetchArticles } from '@/api/blog'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import Link from 'next/link'

async function getData(): Promise<Article[]> {
  return await fetchArticles()
}

export default async function BlogPage() {
  const articles = await getData()

  return (
    <div className="wrapper p-16">
      <div className="grid grid-cols-1 gap-4 p-2">
        {articles.map(article => {
          return (
            <Link href={`/blog/${article.name}`} key={article.name}>
              <Card className="min-h-full min-w-full transition-colors hover:border-gray-400">
                <CardHeader className="relative p-4">
                  <time
                    className="text-xs text-muted-foreground"
                    dateTime={article.releaseDate}
                  >
                    {article.releaseDate}
                  </time>
                  <CardTitle className="text-lg">{article.title}</CardTitle>
                  <CardDescription className="h-16 overflow-hidden">
                    {article.description}
                  </CardDescription>
                  <div className="pointer-events-none absolute bottom-4 right-4 block h-6 w-3/5 bg-gradient-to-r from-transparent to-background" />
                </CardHeader>
              </Card>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
