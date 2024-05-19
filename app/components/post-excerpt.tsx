import { Card, CardDescription, CardHeader, CardTitle } from 'app/components/ui/card'
import ViewCounter from 'app/components/view-counter'
import { Suspense } from 'react'
import { Post, PostMatter } from 'utils/api/post'
import { getPostViews } from 'utils/db/querys'
import { truncate } from '../../utils/utils'
import PostLink from './shared/post-link'
import TagBadges from './tag-badges'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

export default function PostExcerpt({ post }: { post: Post }) {
  const { matter, content } = post

  return (
    <Card as='article' className='h-full w-full border-none hover:bg-accent'>
      <CardHeader>
        <HeaderMeta matter={matter} />
        <PostLink className='group' writer={matter.writer} slug={matter.slug}>
          <CardTitle className='text-2xl group-hover:underline'>{matter.title}</CardTitle>
          <CardDescription className='h-10 overflow-hidden'>{truncate(content)}</CardDescription>
        </PostLink>
        <TagBadges tags={matter.tags} />
      </CardHeader>
    </Card>
  )
}

function HeaderMeta({ matter: { writer, created_at, slug } }: { matter: PostMatter }) {
  return (
    <div className='flex items-center gap-1 font-semibold text-muted-foreground text-sm'>
      <PostLink className='link flex items-center' writer={writer}>
        <Avatar className='h-7 w-7'>
          <AvatarImage src={`https://github.com/${writer}.png?size=28`} alt={writer} />
          <AvatarFallback>{writer}</AvatarFallback>
        </Avatar>
        <span className='ml-2 text-foreground'>{writer}</span>
      </PostLink>
      <time className='before:pr-1 before:content-["|"]' dateTime={created_at.toString()}>
        {new Intl.DateTimeFormat('en-us').format(created_at)}
      </time>
      <Suspense fallback={<span className='flex-grow' />}>
        <Views slug={slug} />
      </Suspense>
    </div>
  )
}

async function Views({ slug }: { slug: string }) {
  const views = await getPostViews()
  return <ViewCounter slug={slug} allViews={views} />
}
