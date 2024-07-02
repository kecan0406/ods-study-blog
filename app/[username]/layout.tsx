import { ReactNode } from 'react'
import { getUserMessages } from 'utils/db/querys'

export const dynamicParams = false
export async function generateStaticParams() {
  const userMessages = await getUserMessages()
  return userMessages.map((userMessage) => ({ username: `@${userMessage.user.login}` }))
}

export default function UserLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <>{children}</>
}
