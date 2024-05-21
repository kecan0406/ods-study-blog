import Profile from './profile'
import WritingPosts from './writing-posts'

export default async function RootPage() {
  return (
    <div className='wrapper py-8'>
      <Profile />
      <WritingPosts />
    </div>
  )
}
