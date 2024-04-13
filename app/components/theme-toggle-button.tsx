'use client'

import { Button } from 'app/components/ui/button'
import { useTheme } from 'next-themes'
import { MdCircle, MdDarkMode, MdLightMode } from 'react-icons/md'
import { useMounted } from 'utils/hooks/use-mounted'

export default function ThemeToggleButton() {
  const { resolvedTheme, setTheme } = useTheme()
  const mounted = useMounted()

  if (!mounted) {
    return (
      <Button variant='ghost' size='icon' className='h-10 w-10 rounded-full'>
        <MdCircle className='h-6 w-6' />
      </Button>
    )
  }

  return (
    <Button
      variant='ghost'
      size='icon'
      className='h-10 w-10 rounded-full'
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
    >
      {resolvedTheme === 'dark' && <MdDarkMode className='h-6 w-6' />}
      {resolvedTheme === 'light' && <MdLightMode className='h-6 w-6' />}
    </Button>
  )
}
