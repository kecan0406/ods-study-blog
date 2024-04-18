'use client'

import { Button } from 'app/components/ui/button'
import { useTheme } from 'next-themes'
import { useState } from 'react'
import { MdDarkMode, MdFlashlightOff, MdFlashlightOn, MdLightMode } from 'react-icons/md'
import { useFlashlight } from 'utils/hooks/use-flashlight'
import { useMounted } from 'utils/hooks/use-mounted'

export default function ThemeToggleButton() {
  const { resolvedTheme, setTheme } = useTheme()
  const [count, setCount] = useState<number>(0)

  const isPrevFL = count >= 9
  const isFL = count >= 10

  const handleTheme = () => {
    const theme = resolvedTheme === 'dark' ? 'light' : 'dark'
    setTheme(isPrevFL ? 'light' : theme)
    setCount(isFL ? 0 : count + 1)
  }

  const flashlightRef = useFlashlight(isFL)
  if (!useMounted()) return null
  return (
    <>
      <Button variant='ghost' size='icon' className='h-10 w-10 rounded-full' onClick={handleTheme}>
        {isPrevFL ? (
          isFL ? (
            <MdFlashlightOff className='theme-icon' />
          ) : (
            <MdFlashlightOn className='theme-icon' />
          )
        ) : resolvedTheme === 'dark' ? (
          <MdDarkMode className='theme-icon' />
        ) : (
          <MdLightMode className='theme-icon' />
        )}
      </Button>
      <div id='flashlight' className={isFL ? 'block' : 'hidden'} ref={flashlightRef} />
    </>
  )
}
