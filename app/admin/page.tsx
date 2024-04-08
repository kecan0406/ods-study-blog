import { SignInButton, SignOutButton } from '@/app/components/auth-buttons'
import { auth } from '@/utils/auth'

export default async function AdminPage() {
  const session = await auth()

  return <div className='wrapper'>{session ? <SignOutButton /> : <SignInButton />}</div>
}
