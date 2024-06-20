import Avatar from 'app/components/ui/avatar'

export default async function Profile({ username }: { username: string }) {
  return (
    <div className='flex justify-center p-2'>
      <Avatar
        className='border-2 border-white drop-shadow-md'
        size={112}
        src={`https://github.com/${username}.png`}
        alt={username}
      />
    </div>
  )
}
