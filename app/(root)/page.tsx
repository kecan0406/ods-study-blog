import { Post, fetchPosts } from 'utils/api/post'
import Profile from './profile'
import WritingPosts from './writing-posts'

const getPosts = async (): Promise<Post[]> => {
  const posts = await fetchPosts()
  return posts.toSorted((a, b) => b.matter.created_at.getTime() - a.matter.created_at.getTime())
}

export default async function RootPage() {
  const posts = await getPosts()

  return (
    <div className='wrapper py-8'>
      <Profile />
      <WritingPosts posts={posts} />
    </div>
  )
}
