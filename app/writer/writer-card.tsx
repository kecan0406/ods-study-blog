import PostLink from 'app/components/shared/post-link'
import Avatar from 'app/components/ui/avatar'
import { Button } from 'app/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from 'app/components/ui/card'
import { UserGithubStatus } from 'app/components/user-github-status'
import { Views } from 'app/components/view-counter'
import { Suspense } from 'react'
import { MdArticle } from 'react-icons/md'
import { Discussion } from 'utils/db/graphql'

export async function WriterCard({ user, posts }: { user: string; posts: Discussion[] }) {
  return (
    <Card className='md:flex'>
      <CardHeader className='my-auto min-w-40 items-center border-r md:w-auto'>
        <Avatar className='border' size={64} src={`https://github.com/${user}.png`} alt={user} />
        <CardTitle className='pb-1'>{user}</CardTitle>
        <Suspense>
          <UserGithubStatus id={user} />
        </Suspense>
      </CardHeader>
      <CardContent className='my-4 h-40 w-full'>
        <ul className='max-h-40'>
          {posts.map((post) => (
            <li key={post.slug} className='mb-2'>
              <PostCard post={post} />
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

function PostCard({ post }: { post: Discussion }) {
  return (
    <Button variant='ghost' asChild className='w-full'>
      <PostLink writer={post.author.login} slug={post.slug}>
        <MdArticle className='h-4 w-4' />
        <span className='ml-1 text-wrap'>{post.title}</span>
        <Suspense fallback={<span className='flex-grow' />}>
          <Views slug={post.slug} />
        </Suspense>
      </PostLink>
    </Button>
  )
}
