'use client'

import { Button } from 'app/components/ui/button'
import { useTheme } from 'next-themes'
import { MouseEvent, useState } from 'react'
import { MdDarkMode, MdFlashlightOff, MdFlashlightOn, MdLightMode } from 'react-icons/md'
import { useFlashlight } from 'utils/hooks/use-flashlight'

export default function ThemeToggleButton() {
  const { resolvedTheme, setTheme } = useTheme()
  const [count, setCount] = useState<number>(0)

  const isPrevFL = count >= 9
  const isFL = count >= 10

  const handleTheme = (e: MouseEvent) => {
    setCount(isFL ? 0 : count + 1)
    const theme = isPrevFL ? 'light' : resolvedTheme === 'dark' ? 'light' : 'dark'
    if (!document.startViewTransition) return setTheme(theme)
    const transition = document.startViewTransition(() => setTheme(theme))
    transition.ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0 at ${e.clientX}px ${e.clientY}px)`, `circle(100%)`] },
        {
          duration: 500,
          easing: 'ease-in',
          pseudoElement: '::view-transition-new(root)'
        }
      )
    })
  }

  const flashlightRef = useFlashlight(isFL)
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
