import ViewCount from 'app/blog/[slug]/view-count'
import { Avatar, AvatarFallback, AvatarImage } from 'app/components/ui/avatar'
import Link from 'next/link'
import { Suspense } from 'react'
import { FrontMatterArticle } from 'utils/api/blog'
import { Badge } from '../../components/ui/badge'

type BlogHeaderProps = FrontMatterArticle
export default function BlogHeader({ matter }: { matter: BlogHeaderProps }) {
  const { title, releaseDate, readingTime, writer, tags } = matter
  return (
    <header className='flex flex-col justify-center'>
      <h1 className='text-balance'>{title}</h1>
      <div className='not-prose flex gap-4 font-semibold text-sm'>
        <Link href={`https://github.com/${writer}`}>
          <Avatar>
            <AvatarImage src={`https://github.com/${writer}.png`} alt={`@${writer}`} />
            <AvatarFallback>{writer}</AvatarFallback>
          </Avatar>
        </Link>
        <div className='w-full flex-col'>
          <div className='flex'>
            <Link className='link' href={`https://github.com/${writer}`}>
              {writer}
            </Link>
            <Suspense fallback={<span className='flex-grow' />}>
              <ViewCount slug={matter.slug} />
            </Suspense>
          </div>
          <div className='mt-0.5 flex text-muted-foreground'>
            <time dateTime={releaseDate}>{releaseDate}</time>
            <span className='before:px-1 before:content-["•"]'>{readingTime} min</span>
            <div className='flex grow justify-end gap-1'>
              {tags.map((tag) => (
                <Badge variant='secondary' className='before:pr-0.5 before:content-["#"]' key={tag}>
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
