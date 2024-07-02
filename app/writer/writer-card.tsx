import PostLink from 'app/components/shared/post-link'
import Avatar from 'app/components/ui/avatar'
import { Button, buttonVariants } from 'app/components/ui/button'
import { Card, CardContent, CardHeader } from 'app/components/ui/card'
import { UserGithubMessage } from 'app/components/user-github-message'
import { Views } from 'app/components/view-counter'
import Link from 'next/link'
import { Suspense } from 'react'
import { MdArticle } from 'react-icons/md'
import { Post } from 'utils/gql/query'

export async function WriterCard({ user, posts }: { user: string; posts: Post[] }) {
  return (
    <Card className='md:flex'>
      <CardHeader className='my-auto min-w-40 items-center border-r md:w-auto'>
        <div className='peer relative'>
          <Link href={`/@${user}`}>
            <Avatar className='border' size={64} src={`https://github.com/${user}.png`} alt={user} />
          </Link>
          <Suspense>
            <UserGithubMessage id={user} />
          </Suspense>
        </div>
        <Link
          className={buttonVariants({ variant: 'link', className: 'font-semibold peer-has-[:hover]:underline' })}
          href={`/@${user}`}
        >
          {user}
        </Link>
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

function PostCard({ post }: { post: Post }) {
  return (
    <Button variant='ghost' asChild className='w-full'>
      <PostLink category={post.category.slug} slug={post.slug}>
        <MdArticle className='h-4 w-4' />
        <span className='ml-1 text-wrap'>{post.title}</span>
        <Suspense fallback={<span className='flex-grow' />}>
          <Views slug={post.slug} />
        </Suspense>
      </PostLink>
    </Button>
  )
}
