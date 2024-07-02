import { Card, CardDescription, CardHeader, CardTitle } from 'app/components/ui/card'
import { Views } from 'app/components/view-counter'
import { Suspense } from 'react'
import { Post } from 'utils/gql/query'
import { truncate } from 'utils/utils'
import IntlTime from './intl-time'
import PostLink from './shared/post-link'
import Avatar from './ui/avatar'
import { Badge } from './ui/badge'

export default function PostExcerpt({ post }: { post: Post }) {
  const {
    slug,
    category,
    author: { login: writer },
    body,
    title,
    labels
  } = post

  return (
    <Card as='article' className='group relative h-44 border-none hover:bg-accent'>
      <PostLink className='absolute inset-0 size-full' category={category.slug} slug={slug} />
      <CardHeader>
        <HeaderMeta post={post} />
        <CardTitle className='text-2xl group-hover:underline'>{title}</CardTitle>
        <CardDescription className='m-2 line-clamp-3'>{truncate(body)}</CardDescription>
        <div className='mt-1 flex justify-end gap-2'>
          {labels.nodes.map((label) => (
            <Badge style={{ borderColor: `#${label.color}` }} variant='secondary' key={label.name}>
              {label.name}
            </Badge>
          ))}
        </div>
      </CardHeader>
    </Card>
  )
}

function HeaderMeta({ post }: { post: Post }) {
  const {
    category,
    author: { login: writer },
    createdAt,
    slug
  } = post
  return (
    <div className='flex items-center gap-1 font-semibold text-muted-foreground text-sm'>
      <PostLink className='link z-10 flex items-center' category={category.slug}>
        <Avatar className='border border-accent' size={28} src={`https://github.com/${writer}.png`} alt={writer} />
        <span className='ml-2 text-foreground'>{writer}</span>
      </PostLink>
      <IntlTime className='mr-1 before:pr-1 before:content-["|"]' date={createdAt} />
      <Suspense fallback={<span className='grow' />}>
        <Views slug={slug} />
      </Suspense>
    </div>
  )
}
