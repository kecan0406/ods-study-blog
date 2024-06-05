import { cache } from 'react'
import { GithubStatus, getGithubStatus } from 'utils/db/querys'
import { Badge } from './ui/badge'

export const preloadUserStatus = cache(getGithubStatus)

export async function UserGithubStatus({ id }: { id: string }) {
  const allGithubStatus = await preloadUserStatus()
  return <Status id={id} allGithubStatus={allGithubStatus} />
}

async function Status({ id, allGithubStatus }: { id: string; allGithubStatus: GithubStatus[] }) {
  const { status } = allGithubStatus.find(({ login }) => login === id)!

  return (
    <div className='group font-semibold text-xs'>
      <div
        anchor={`${id}-message`}
        className='status-anchor -ms-px invisible opacity-0 transition-opacity group-hover:visible group-hover:opacity-100'
      >
        {status?.message}
      </div>
      <Badge
        id={`${id}-message`}
        className='rounded-full bg-background p-1.5 transition-[border-radius] group-hover:rounded-r-none'
        variant='outline'
        dangerouslySetInnerHTML={{ __html: status?.emojiHTML ?? '😀' }}
      />
    </div>
  )
}
