import PostLink from 'app/components/shared/post-link'
import Avatar from 'app/components/ui/avatar'
import { Button } from 'app/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from 'app/components/ui/card'
import { ScrollArea } from 'app/components/ui/scroll-area'
import { Views } from 'app/components/view-counter'
import { Suspense } from 'react'
import { MdArticle } from 'react-icons/md'
import { Post } from 'utils/api/post'
import { User } from 'utils/db/kysely'

export async function WriterCard({ user, posts }: { user: User; posts: Post[] }) {
  return (
    <Card className='md:flex'>
      <CardHeader className='my-auto min-w-40 items-center border-r md:w-auto'>
        <Avatar className='border' size={64} src={`https://github.com/${user.id}.png`} alt={user.id} />
        <CardTitle className='pb-1'>{user.id}</CardTitle>
        <CardDescription className='overflow-hidden'>{user.intro}</CardDescription>
      </CardHeader>
      <CardContent className='my-4 h-40 w-full'>
        <ScrollArea>
          <ul className='max-h-40'>
            {posts.map((post) => (
              <li key={post.matter.slug} className='mb-2'>
                <PostCard post={post} />
              </li>
            ))}
          </ul>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

function PostCard({ post }: { post: Post }) {
  return (
    <Button variant='ghost' asChild className='w-full'>
      <PostLink writer={post.matter.writer} slug={post.matter.slug}>
        <MdArticle className='h-4 w-4' />
        <span className='ml-1 text-wrap'>{post.matter.title}</span>
        <Suspense fallback={<span className='flex-grow' />}>
          <Views slug={post.matter.slug} />
        </Suspense>
      </PostLink>
    </Button>
  )
}
