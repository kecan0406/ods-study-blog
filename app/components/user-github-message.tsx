import { unstable_noStore as noStore } from 'next/cache'
import { cache, use } from 'react'
import { getUserMessages } from 'utils/db/querys'
import { UserMessage } from 'utils/gql/query'
import { Badge } from './ui/badge'

const userMessages = cache(getUserMessages)

export function UserGithubMessage({ id }: { id: string }) {
  noStore()
  const allUserStatus = use(userMessages())
  return <Status id={id} allUserStatus={allUserStatus} />
}

function Status({ id, allUserStatus }: { id: string; allUserStatus: UserMessage[] }) {
  const status = allUserStatus.find(({ user }) => user.login === id)

  return (
    <div className='group -right-3 absolute bottom-0 drop-shadow-md'>
      <div
        anchor={`${id}-message`}
        className='status-anchor -ms-px invisible rounded-r-full border border-l-0 bg-background font-semibold text-xs opacity-0 transition-opacity group-hover:visible group-hover:opacity-100'
      >
        {status?.message}
      </div>
      <Badge
        id={`${id}-message`}
        className='rounded-full bg-background p-1.5 transition-[border-radius] group-hover:rounded-r-none'
        variant='outline'
        dangerouslySetInnerHTML={{ __html: status?.emoji ?? '😀' }}
      />
    </div>
  )
}
