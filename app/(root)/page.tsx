import { Button } from '@/components/ui/button'
import Link from 'next/link'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Article, fetchArticles } from '@/utils/api/blog'

async function getData(): Promise<Article[]> {
  const articles = await fetchArticles()
  return articles.toSorted(
    (a, b) =>
      new Date(b.matter.releaseDate).getTime() -
      new Date(a.matter.releaseDate).getTime()
  )
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
        <div className="grid grid-cols-1 gap-4 p-2">
          {articles.map(({ matter, content }) => {
            return (
              <Link href={`/blog/${matter.slug}`} key={matter.slug}>
                <Card className="min-h-full min-w-full transition-colors hover:border-gray-400">
                  <CardHeader className="relative p-4">
                    <time
                      className="text-xs text-muted-foreground"
                      dateTime={matter.releaseDate}
                    >
                      {matter.releaseDate}
                    </time>
                    <CardTitle className="text-lg">{matter.title}</CardTitle>
                    <CardDescription className="h-16 overflow-hidden">
                      {content}
                    </CardDescription>
                    <div className="pointer-events-none absolute bottom-4 right-4 block h-6 w-3/5 bg-gradient-to-r from-transparent to-background" />
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
