import Comments from './comments'
import Sponsors from './sponsors'

export default async function PostFooter() {
  return (
    <div className='not-prose'>
      <Sponsors />
      <Comments />
    </div>
  )
}
