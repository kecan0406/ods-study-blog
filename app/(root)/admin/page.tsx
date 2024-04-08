import { auth } from '@/app/auth'
import { SignInButton, SignOutButton } from '@/app/components/auth-buttons'

export default async function AdminPage() {
  const session = await auth()

  return <div className='wrapper'>{session ? <SignOutButton /> : <SignInButton />}</div>
}
