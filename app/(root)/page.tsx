import Profile from './profile'
import WritingPosts from './writing-posts'

export const experimental_ppr = true
export default function RootPage() {
  return (
    <div className='wrapper py-8'>
      <Profile />
      <WritingPosts />
    </div>
  )
}
