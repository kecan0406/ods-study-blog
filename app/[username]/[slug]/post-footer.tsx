import Comments from './comments'

export default async function PostFooter() {
  return (
    <div className='not-prose'>
      <Comments />
    </div>
  )
}
