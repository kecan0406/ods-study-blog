'use client'

import { Button } from 'app/components/ui/button'
import { clsx } from 'clsx'
import { useTheme } from 'next-themes'
import { MouseEvent, useState } from 'react'
import { MdDarkMode, MdFlashlightOff, MdFlashlightOn, MdLightMode } from 'react-icons/md'
import { useFlashlight } from 'utils/hooks/use-flashlight'

export default function ThemeToggleButton() {
  const { resolvedTheme, setTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'

  const [count, setCount] = useState<number>(0)
  const isPrevFL = count >= 9
  const isFL = count >= 10

  const handleTheme = async ({ nativeEvent: { x, y } }: MouseEvent) => {
    if (isPrevFL) moveLight(x, y)
    const switchTheme = () => setTheme(isDark || isPrevFL ? 'light' : 'dark')
    document.startViewTransition
      ? await document.startViewTransition(switchTheme).ready.then(() =>
          document.documentElement.animate(
            { clipPath: [`circle(0 at ${x}px ${y}px)`, 'circle(100%)'] },
            {
              duration: 500,
              easing: 'ease-in',
              pseudoElement: '::view-transition-new(root)'
            }
          )
        )
      : switchTheme()
    setCount(isFL ? 0 : count + 1)
  }

  const { flashlightRef, moveLight } = useFlashlight(isFL)
  return (
    <>
      <Button variant='ghost' size='icon' className='h-10 w-10 rounded-full' onClick={handleTheme}>
        {isPrevFL ? (
          isFL ? (
            <MdFlashlightOff className='theme-icon' />
          ) : (
            <MdFlashlightOn className='theme-icon' />
          )
        ) : isDark ? (
          <MdDarkMode className='theme-icon' />
        ) : (
          <MdLightMode className='theme-icon' />
        )}
      </Button>
      <div id='flashlight' className={clsx({ hidden: !isFL })} ref={flashlightRef} />
    </>
  )
}
