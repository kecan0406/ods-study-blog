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
  const positionRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 })

  useEffect(() => {
    window.addEventListener('mousemove', handlePosition)
    window.addEventListener('touchmove', handlePosition)
    return () => {
      window.removeEventListener('mousemove', handlePosition)
      window.removeEventListener('touchmove', handlePosition)
    }
  }, [])

  const handleTheme = (e: React.MouseEvent) => {
    countRef.current++
    handleFL()

    const theme = resolvedTheme === 'dark' ? 'light' : 'dark'
    if (countRef.current >= 10) {
      handlePosition(e.nativeEvent)
      setTheme('light')
    } else {
      setTheme(theme)
    }
  }

  const handleFL = () => {
    const count = countRef.current
    const { x, y } = positionRef.current
    if (count >= 10) {
      const flashlight = flashlightRef.current!
      flashlight.style.setProperty('display', 'block')
      flashlight.style.setProperty('--Xpos', `${x}px`)
      flashlight.style.setProperty('--Ypos', `${y}px`)

      if (count >= 11) {
        flashlight.style.setProperty('display', 'none')
        countRef.current = 0
      }
    }
  }

  const handlePosition = (e: MouseEvent | TouchEvent) => {
    if (e.type === 'mousemove') {
      const event = e as MouseEvent
      positionRef.current = { x: event.clientX, y: event.clientY }
    }
    if (e.type === 'touchmove') {
      const event = e as TouchEvent
      positionRef.current = { x: event.touches[0].clientX, y: event.touches[0].clientY }
    }
    handleFL()
  }

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
