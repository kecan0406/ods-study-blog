import { auth } from '@/app/auth'
import { SignIn, SignOut } from '@/components/auth-buttons'

export default async function AdminPage() {
  const session = await auth()

  return <div className='wrapper pt-16'>{session ? <SignOut /> : <SignIn />}</div>
}
