import ViewCount from 'app/blog/[slug]/view-count'
import { Avatar, AvatarFallback, AvatarImage } from 'app/components/ui/avatar'
import Link from 'next/link'
import { Suspense } from 'react'
import { FrontMatterArticle } from 'utils/api/blog'

type BlogHeaderProps = FrontMatterArticle
export default function BlogHeader({ matter }: { matter: BlogHeaderProps }) {
  const { title, releaseDate, readingTime, writer } = matter
  return (
    <header className='flex justify-center flex-col'>
      <h1>{title}</h1>
      <div className='flex gap-4 not-prose text-sm font-semibold'>
        <Link href={`https://github.com/${writer}`}>
          <Avatar>
            <AvatarImage src={`https://github.com/${writer}.png`} alt={`@${writer}`} />
            <AvatarFallback>{writer}</AvatarFallback>
          </Avatar>
        </Link>
        <div className='w-full'>
          <Link className='link' href={`https://github.com/${writer}`}>
            {writer}
          </Link>
          <div className='flex text-muted-foreground mt-0.5'>
            <time dateTime={releaseDate}>{releaseDate}</time>
            <span className='before:px-1 before:content-["•"]'>{readingTime} min</span>
            <Suspense fallback={<span className='flex-grow' />}>
              <ViewCount slug={matter.slug} />
            </Suspense>
          </div>
        </div>
      </div>
    </header>
  )
}
