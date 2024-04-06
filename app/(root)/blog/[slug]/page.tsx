import { increment } from '@/app/db/actions'
import ArticleMdxRemote from '@/components/article-mdx'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import ViewCounter from '@/components/view-counter'
import { FrontMatterArticle, fetchArticle } from '@/utils/api/blog'
import { mdxRemoteOptions } from '@/utils/md-utils'
import Link from 'next/link'
import { Suspense } from 'react'

export default async function Page({ params }: { params: { slug: string } }) {
  const { matter, content } = await fetchArticle(params.slug)

  return (
    <article className='wrapper py-8 prose prose-zinc md:prose-lg dark:prose-invert prose-figcaption:mt-0'>
      <Header matter={matter} />
      <Separator className='my-4' />
      <ArticleMdxRemote options={mdxRemoteOptions} source={content} />
    </article>
  )
}

type HeaderProps = FrontMatterArticle
const Header = ({ matter }: { matter: HeaderProps }) => {
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
            <span className='flex-grow text-right'>
              <Suspense>
                <ViewCount slug={matter.slug} />
              </Suspense>
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}

const ViewCount = async ({ slug }: { slug: string }) => {
  increment(slug)
  return <ViewCounter slug={slug} />
}
