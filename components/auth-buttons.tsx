'use client'

import { Button } from '@/components/ui/button'
import { signIn, signOut } from 'next-auth/react'

export const SignInButton = () => {
  return (
    <Button variant='ghost' className='font-bold' onClick={() => signIn('github')}>
      Sign in with GitHub
    </Button>
  )
}

export const SignOutButton = () => {
  return (
    <Button variant='ghost' className='font-bold' onClick={() => signOut()}>
      Sign Out
    </Button>
  )
}
