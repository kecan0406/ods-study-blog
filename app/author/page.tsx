import PostLink from 'app/components/shared/post-link'
import { Avatar, AvatarFallback, AvatarImage } from 'app/components/ui/avatar'
import { Button } from 'app/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from 'app/components/ui/card'
import { ScrollArea } from 'app/components/ui/scroll-area'
import ViewCounter from 'app/components/view-counter'
import { MdArticle } from 'react-icons/md'
import { Post, fetchPosts } from 'utils/api/post'
import { getPostsCount, getUsers } from 'utils/db/querys'

export default async function AuthorPage() {
  const users = await getUsers()
  return (
    <div className='wrapper py-8'>
      <ul>
        {users.map(({ username, intro }) => (
          <li key={username} className='mb-4'>
            <AuthorCard username={username} intro={intro} />
          </li>
        ))}
      </ul>
    </div>
  )
}

const getPosts = async (username: string): Promise<Post[]> => {
  const posts = await fetchPosts()
  return posts
    .filter((post) => post.matter.writer === username)
    .toSorted((a, b) => new Date(b.matter.releaseDate).getTime() - new Date(a.matter.releaseDate).getTime())
}

async function AuthorCard({ username, intro }: { username: string; intro: string }) {
  const posts = await getPosts(username)
  return (
    <Card className='md:flex'>
      <CardHeader className='my-auto min-w-40 items-center border-r md:w-auto'>
        <Avatar className='h-16 w-16 border'>
          <AvatarImage src={`https://github.com/${username}.png?size=64`} alt={username} />
          <AvatarFallback>{username}</AvatarFallback>
        </Avatar>
        <CardTitle className='pb-1'>{username}</CardTitle>
        <CardDescription className='overflow-hidden'>{intro}</CardDescription>
      </CardHeader>
      <CardContent className='my-4 h-40 w-full'>
        <ScrollArea>
          <ul className='max-h-40'>
            {posts.map((post) => (
              <li key={post.matter.slug} className='mb-2'>
                <Button variant='ghost' asChild className='w-full'>
                  <PostLink writer={post.matter.writer} slug={post.matter.slug}>
                    <MdArticle className='h-4 w-4' />
                    <span className='ml-1 text-wrap'>{post.matter.title}</span>
                    <Views slug={post.matter.slug} />
                  </PostLink>
                </Button>
              </li>
            ))}
          </ul>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

async function Views({ slug }: { slug: string }) {
  const views = await getPostsCount()
  return <ViewCounter slug={slug} allViews={views} />
}
