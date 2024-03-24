'use client'

import { Button } from '@/components/ui/button'
import { signIn, signOut } from 'next-auth/react'

export const SignIn = () => {
  return <Button onClick={() => signIn('github')}>Sign in with GitHub</Button>
}

export const SignOut = () => {
  return <Button onClick={() => signOut()}>Sign Out</Button>
}
