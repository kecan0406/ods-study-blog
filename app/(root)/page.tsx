import { Button } from '@/components/ui/button'
import Link from 'next/link'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Article, fetchArticles } from '@/api/blog'

async function getData(): Promise<Article[]> {
  return await fetchArticles()
}

export default async function Page() {
  const articles = await getData()

  return (
    <div className="wrapper p-16">
      <section className="max-w-2xl pt-16">
        <h1 className="scroll-m-20 text-4xl font-extrabold leading-tight tracking-tighter lg:text-5xl">
          우리는 여기에
          <br />
          서로의 성장을 위해 모였습니다
        </h1>
        <p className="mt-2 text-xl font-bold text-muted-foreground">
          ODS Study에 담긴 여러 이야기를 전합니다.
        </p>
      </section>
      <section className="pt-16">
        <Link href="blog">
          <Button variant="link" className="mb-6 p-2">
            <h2 className="text-2xl">Featured Articles</h2>
          </Button>
        </Link>
        <div className="grid grid-cols-2 gap-4 p-2">
          {articles.map(article => {
            return (
              <Link href={`/blog/${article.name}`} key={article.name}>
                <Card className="min-h-full min-w-full">
                  <CardHeader className="relative">
                    <CardTitle>{article.title}</CardTitle>
                    <CardDescription className="h-16 overflow-hidden">
                      {article.description}
                    </CardDescription>
                    <div className="pointer-events-none absolute bottom-6 right-6 block h-6 w-3/5 bg-gradient-to-r from-transparent to-background" />
                  </CardHeader>
                </Card>
              </Link>
            )
          })}
        </div>
      </section>
    </div>
  )
}
