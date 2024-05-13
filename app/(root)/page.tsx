import { Post, fetchPosts } from 'utils/api/post'
import Profile from './profile'
import WritingPosts from './writing-posts'

const getPosts = async (): Promise<Post[]> => {
  const posts = await fetchPosts()
  return posts.toSorted((a, b) => new Date(b.matter.releaseDate).getTime() - new Date(a.matter.releaseDate).getTime())
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
