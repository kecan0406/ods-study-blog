import IntlTime from 'app/components/intl-time'
import PostLink from 'app/components/shared/post-link'
import Avatar from 'app/components/ui/avatar'
import { Badge } from 'app/components/ui/badge'
import { IncrementViews } from 'app/components/view-counter'
import Image from 'next/image'
import { Suspense } from 'react'
import { Post } from 'utils/gql/query'

export default function PostHeader({ post }: { post: Post }) {
  const {
    title,
    author: { login: writer },
    labels
  } = post

  return (
    <header className='flex flex-col justify-center'>
      <h1 className='text-balance'>{title}</h1>
      <div className='not-prose mb-2 flex gap-4 font-semibold text-sm'>
        <PostLink writer={writer}>
          <Avatar className='border' size={40} src={`https://github.com/${writer}.png`} alt={writer} />
        </PostLink>
        <div className='w-full flex-col'>
          <div className='flex'>
            <PostLink className='link' writer={writer}>
              {writer}
            </PostLink>
          </div>
          <div className='mt-0.5 flex text-muted-foreground'>
            <IntlTime date={post.createdAt} />
            <Suspense fallback={<span className='flex-grow' />}>
              <IncrementViews slug={post.slug} />
            </Suspense>
          </div>
        </div>
      </div>
      <div className='my-2 flex gap-2 overflow-x-auto'>
        {labels.nodes.map((label) => (
          <Badge className='before:content-["#"]' variant='secondary' key={label.name}>
            {label.name}
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
