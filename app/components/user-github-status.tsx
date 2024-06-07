import { unstable_noStore as noStore } from 'next/cache'
import { cache } from 'react'
import { UserStatus } from 'utils/db/graphql'
import { getUserStatuses } from 'utils/db/querys'
import { Badge } from './ui/badge'

export const preloadUserStatus = cache(getUserStatuses)

export async function UserGithubStatus({ id }: { id: string }) {
  noStore()
  const allUserStatus = await preloadUserStatus()
  return <Status id={id} allUserStatus={allUserStatus} />
}

async function Status({ id, allUserStatus }: { id: string; allUserStatus: UserStatus[] }) {
  const status = allUserStatus.find(({ user }) => user.login === id)

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
