import PostLink from 'app/components/shared/post-link'
import { Avatar, AvatarFallback, AvatarImage } from 'app/components/ui/avatar'
import { Badge } from 'app/components/ui/badge'
import Image from 'next/image'
import { Suspense } from 'react'
import { PostMatter } from 'utils/api/post'
import ViewCount from './view-count'

export default function PostHeader({ matter }: { matter: PostMatter }) {
  const { title, releaseDate, readingTime, writer, image, tags } = matter
  return (
    <header className='flex flex-col justify-center'>
      {image && <HeaderImage image={image} title={title} />}
      <h1 className='text-balance'>{title}</h1>
      <div className='not-prose mb-2 flex gap-4 font-semibold text-sm'>
        <PostLink writer={writer}>
          <Avatar>
            <AvatarImage src={`https://github.com/${writer}.png?size=40`} alt={`@${writer}`} />
            <AvatarFallback>{writer}</AvatarFallback>
          </Avatar>
        </PostLink>
        <div className='w-full flex-col'>
          <div className='flex'>
            <PostLink className='link' writer={writer}>
              {writer}
            </PostLink>
            <Suspense fallback={<span className='flex-grow' />}>
              <ViewCount slug={matter.slug} />
            </Suspense>
          </div>
          <div className='mt-0.5 flex text-muted-foreground'>
            <time dateTime={releaseDate}>{releaseDate}</time>
            <span className='before:px-1 before:content-["•"]'>{readingTime} min</span>
          </div>
        </div>
      </div>
      <div className='my-2 flex gap-2 overflow-x-auto'>
        {tags.map((tag) => (
          <Badge className='before:content-["#"]' variant='secondary' key={tag}>
            {tag}
          </Badge>
        ))}
      </div>
    </header>
  )
}

function HeaderImage({ image, title }: { image: string; title: string }) {
  return (
    <div className='not-prose relative my-4'>
      <Image src={image} alt={title} width={768} height={384} sizes='768px' priority className='max-h-96 rounded-xl' />
    </div>
  )
}
