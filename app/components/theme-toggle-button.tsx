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
      <Button aria-label='theme-btn' variant='ghost' size='icon' className='rounded-full' onClick={handleTheme}>
        <div data-hide-on-theme='dark'>
          {isFL ? <MdFlashlightOff className='size-6' /> : <MdLightMode className='size-6' />}
        </div>
        <div data-hide-on-theme='light'>
          {isPrevFL ? <MdFlashlightOn className='size-6' /> : <MdDarkMode className='size-6' />}
        </div>
      </Button>
      <div ref={flashlightRef} className={clsx('flashlight', { hidden: !isFL })} />
    </>
  )
}
