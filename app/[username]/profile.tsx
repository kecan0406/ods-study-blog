import Avatar from 'app/components/ui/avatar'
import { UserMessage } from 'utils/gql/query'
import { UserGithubMessage } from '../components/user-github-message'

export default async function Profile({ userMessage }: { userMessage: UserMessage }) {
  const { user } = userMessage

  return (
    <section className='flex flex-col items-center gap-2 p-2'>
      <div className='relative'>
        <Avatar
          className='border-2 border-white drop-shadow-md'
          size={112}
          src={`https://github.com/${user.login}.png`}
          alt={user.login}
        />
        <UserGithubMessage id={user.login} />
      </div>
      <div className='p-2 text-center'>
        <span className='font-bold text-2xl tracking-wide'>{user.name}</span>
        <p className='text-base text-muted-foreground'>{user.bio}</p>
      </div>
    </section>
  )
}
