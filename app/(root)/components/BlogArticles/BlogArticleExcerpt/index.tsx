import ShadowEffect from '@/components/shadow-effect'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Article } from '@/utils/api/blog'
import Link from 'next/link'

export default function BlogArticleExcerpt({ article }: { article: Article }) {
  const { matter, content } = article

  return (
    <li>
      <Link href={`/blog/${matter.slug}`}>
        <Card as='article' className='min-h-full min-w-full transition-colors hover:border-gray-400'>
          <CardHeader className='relative p-4'>
            <time className='text-xs text-muted-foreground' dateTime={matter.releaseDate}>
              {matter.releaseDate}
            </time>
            <CardTitle className='text-lg'>{matter.title}</CardTitle>
            <CardDescription className='h-16 overflow-hidden'>{content}</CardDescription>
            <ShadowEffect />
          </CardHeader>
        </Card>
      </Link>
    </li>
  )
}
