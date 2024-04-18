'use client'

import { RefObject, useEffect, useRef } from 'react'

export const useFlashlight = (isFL: boolean): RefObject<HTMLDivElement> => {
  const flashlightRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isFL) return
    const flashlight = flashlightRef.current!

    const mouseMove = (e: MouseEvent) => lightMove(e.clientX, e.clientY)
    const touchMove = (e: TouchEvent) => lightMove(e.touches[0].clientX, e.touches[0].clientY)

    const lightMove = (x: number, y: number) => {
      flashlight.style.setProperty('--Xpos', `${x}px`)
      flashlight.style.setProperty('--Ypos', `${y}px`)
    }

    const { x, y } = flashlight.getBoundingClientRect()
    lightMove(x, y)

    flashlight.style.setProperty('visibility', 'visible')
    window.addEventListener('mousemove', mouseMove)
    window.addEventListener('touchmove', touchMove)
    return () => {
      flashlight.style.setProperty('visibility', 'hidden')
      window.removeEventListener('mousemove', mouseMove)
      window.removeEventListener('touchmove', touchMove)
    }
  }, [isFL])

  return flashlightRef
}
