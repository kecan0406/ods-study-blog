import PostLink from 'app/components/shared/post-link'
import { Card } from 'app/components/ui/card'
import { DiscussionInfo } from 'utils/db/graphql'
import { getNearPosts } from 'utils/db/querys'
import Comments from './comments'

export default async function PostFooter({ cursor }: { cursor: string }) {
  return (
    <div className='not-prose'>
      <NavPosts cursor={cursor} />
      <Comments />
    </div>
  )
}

async function NavPosts({ cursor }: { cursor: string }) {
  const { repository } = await getNearPosts(cursor)

  return (
    <div className='grid grid-cols-2 gap-4 py-6 text-center'>
      <NavPost post={repository.prev.nodes[0]} description='이전 글' />
      <NavPost post={repository.next.nodes[0]} description='다음 글' />
    </div>
  )
}

function NavPost({ post, description }: { post?: DiscussionInfo; description: string }) {
  if (!post) {
    return (
      <Card className='cursor-no-drop rounded-none p-4 shadow-none'>
        <p>{description}</p>
        <span>-</span>
      </Card>
    )
  }

  return (
    <PostLink writer={post.author.login} slug={post.slug}>
      <Card className='rounded-none p-4 shadow-none transition-colors hover:bg-accent'>
        <p>{description}</p>
        <span>{post.title}</span>
      </Card>
    </PostLink>
  )
}
