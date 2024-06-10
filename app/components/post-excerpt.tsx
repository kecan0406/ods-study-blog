import { Card, CardDescription, CardHeader, CardTitle } from 'app/components/ui/card'
import { Views } from 'app/components/view-counter'
import { Suspense } from 'react'
import { Discussion } from 'utils/db/graphql'
import { truncate } from 'utils/utils'
import IntlTime from './intl-time'
import PostLink from './shared/post-link'
import Avatar from './ui/avatar'

export default function PostExcerpt({ post }: { post: Discussion }) {
  const {
    slug,
    author: { login: writer },
    body,
    title
  } = post

  return (
    <Card as='article' className='group relative h-36 border-none hover:bg-accent'>
      <PostLink className='absolute inset-0 size-full' writer={writer} slug={slug} />
      <CardHeader>
        <HeaderMeta post={post} />
        <CardTitle className='text-2xl group-hover:underline'>{title}</CardTitle>
        <CardDescription className='m-2 line-clamp-3 shadow-effect'>{truncate(body)}</CardDescription>
      </CardHeader>
    </Card>
  )
}

function HeaderMeta({
  post: {
    author: { login: writer },
    createdAt,
    slug
  }
}: { post: Discussion }) {
  return (
    <div className='flex items-center gap-1 font-semibold text-muted-foreground text-sm'>
      <PostLink className='link z-10 flex items-center' writer={writer}>
        <Avatar size={28} src={`https://github.com/${writer}.png`} alt={writer} />
        <span className='ml-2 text-foreground'>{writer}</span>
      </PostLink>
      <IntlTime className='before:pr-1 before:content-["|"]' date={createdAt} />
      <Suspense fallback={<span className='flex-grow' />}>
        <Views slug={slug} />
      </Suspense>
    </div>
  )
}
