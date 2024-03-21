'use client'

import { Button } from '@/components/ui/button'
import { useMounted } from '@/utils/hooks/use-mounted'
import { useTheme } from 'next-themes'
import { MdDarkMode, MdLightMode } from 'react-icons/md'

const ThemeToggleButton = () => {
  const { resolvedTheme, setTheme } = useTheme()
  const mounted = useMounted()

  if (!mounted) return null
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

export default ThemeToggleButton
