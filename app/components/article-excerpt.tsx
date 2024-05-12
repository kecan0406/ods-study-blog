import { Card, CardDescription, CardHeader, CardTitle } from 'app/components/ui/card'
import ViewCounter from 'app/components/view-counter'
import Link from 'next/link'
import { Suspense } from 'react'
import { Article, FrontMatterArticle } from 'utils/api/blog'
import { getPostsCount } from 'utils/db/querys'
import TagBadge from './tag-badge'

export default function ArticleExcerpt({ article }: { article: Article }) {
  const { matter, content } = article

  return (
    <Link href={`/@${matter.writer}/${matter.slug}`}>
      <Card as='article' className='group h-full w-full border-none hover:bg-accent'>
        <CardHeader>
          <div className='flex gap-1'>
            {matter.tags.map((tag) => (
              <TagBadge tag={tag} key={tag} />
            ))}
          </div>
          <CardTitle className='text-2xl group-hover:underline'>{matter.title}</CardTitle>
          <HeaderMeta matter={matter} />
          <CardDescription className='h-10 overflow-hidden'>{content}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  )
}

function HeaderMeta({ matter }: { matter: FrontMatterArticle }) {
  const { slug, releaseDate, readingTime } = matter
  return (
    <div className='flex font-semibold text-muted-foreground text-sm'>
      <time dateTime={releaseDate}>{releaseDate}</time>
      <span className='before:px-1 before:content-["•"]'>{readingTime} min</span>
      <Suspense fallback={<span className='flex-grow' />}>
        <Views slug={slug} />
      </Suspense>
    </div>
  )
}

async function Views({ slug }: { slug: string }) {
  const views = await getPostsCount()
  return <ViewCounter slug={slug} allViews={views} />
}
