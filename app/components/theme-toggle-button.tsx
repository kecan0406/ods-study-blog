'use client'

import { Button } from 'app/components/ui/button'
import { useTheme } from 'next-themes'
import React, { useEffect, useRef } from 'react'
import { MdDarkMode, MdLightMode } from 'react-icons/md'
import { useMounted } from 'utils/hooks/use-mounted'

export default function ThemeToggleButton() {
  const { resolvedTheme, setTheme } = useTheme()
  const flashlightRef = useRef<HTMLDivElement>(null)
  const countRef = useRef(0)
  const handleTheme = (e: React.MouseEvent) => {
    countRef.current++
    handleFlashlight(e.nativeEvent)

    const theme = resolvedTheme === 'dark' ? 'light' : 'dark'
    setTheme(countRef.current >= 10 ? 'light' : theme)
  }

  const handleFlashlight = (e: MouseEvent) => {
    const count = countRef.current
    if (count >= 10) {
      const flashlight = flashlightRef.current!
      flashlight.style.setProperty('display', 'block')
      flashlight.style.setProperty('--Xpos', `${e.clientX}px`)
      flashlight.style.setProperty('--Ypos', `${e.clientY}px`)

      if (count >= 11) {
        flashlight.style.setProperty('display', 'none')
        countRef.current = 0
      }
    }
  }

  useEffect(() => {
    window.addEventListener('mousemove', handleFlashlight)
    return () => {
      window.removeEventListener('mousemove', handleFlashlight)
    }
  }, [])

  const mounted = useMounted()
  if (!mounted) {
    return null
  }

  return (
    <>
      <Button variant='ghost' size='icon' className='h-10 w-10 rounded-full' onClick={handleTheme}>
        {resolvedTheme === 'dark' && <MdDarkMode className='h-6 w-6' />}
        {resolvedTheme === 'light' && <MdLightMode className='h-6 w-6' />}
      </Button>
      <div id='flashlight' ref={flashlightRef} />
    </>
  )
}
