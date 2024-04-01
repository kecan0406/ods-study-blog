import ShadowEffect from '@/components/shadow-effect'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Article } from '@/utils/api/blog'
import Link from 'next/link'

export const ArticleExcerpt = ({ article }: { article: Article }) => {
  const { matter, content } = article

  return (
    <Link href={`/blog/${matter.slug}`}>
      <Card as='article' className='group border-none min-h-full min-w-full hover:bg-accent'>
        <CardHeader className='relative p-2'>
          <CardTitle className='text-2xl'>{matter.title}</CardTitle>
          <HeaderMeta readingTime={matter.readingTime} releaseDate={matter.releaseDate} />
          <CardDescription className='h-10 font-medium overflow-hidden'>{content}</CardDescription>
          <ShadowEffect />
        </CardHeader>
      </Card>
    </Link>
  )
}
export default ArticleExcerpt

type HeaderMetaProps = { releaseDate: string; readingTime: string }
const HeaderMeta = ({ releaseDate, readingTime }: HeaderMetaProps) => {
  return (
    <div className='text-sm text-muted-foreground font-semibold'>
      <time dateTime={releaseDate}>{releaseDate}</time>
      <span className='before:px-1 before:content-["•"]'>{readingTime} min</span>
    </div>
  )
}
