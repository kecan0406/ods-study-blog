import ShadowEffect from '@/components/shadow-effect'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import ViewCounter from '@/components/view-counter'
import { Article, FrontMatterArticle } from '@/utils/api/blog'
import Link from 'next/link'
import { Suspense } from 'react'

const ArticleExcerpt = ({ article }: { article: Article }) => {
  const { matter, content } = article

  return (
    <Link href={`/blog/${matter.slug}`}>
      <Card as='article' className='group border-none min-h-full min-w-full hover:bg-accent'>
        <CardHeader className='relative p-2'>
          <CardTitle className='text-2xl'>{matter.title}</CardTitle>
          <HeaderMeta matter={matter} />
          <CardDescription className='h-10 font-medium overflow-hidden'>{content}</CardDescription>
          <ShadowEffect />
        </CardHeader>
      </Card>
    </Link>
  )
}
export default ArticleExcerpt

const HeaderMeta = ({ matter }: { matter: FrontMatterArticle }) => {
  const { slug, releaseDate, readingTime } = matter
  return (
    <div className='flex text-sm text-muted-foreground font-semibold'>
      <time dateTime={releaseDate}>{releaseDate}</time>
      <span className='before:px-1 before:content-["•"]'>{readingTime} min</span>
      <span className='flex-grow text-right'>
        <Suspense>
          <ViewCounter slug={slug} />
        </Suspense>
      </span>
    </div>
  )
}
