'use client'

import { RefObject, useCallback, useEffect, useRef } from 'react'

type MoveFn = (x: number, y: number) => void
type UseFlashlightProps = (isFL: boolean) => { flashlightRef: RefObject<HTMLDivElement>; moveLight: MoveFn }

export const useFlashlight: UseFlashlightProps = (isFL) => {
  const flashlightRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isFL) return
    const mouseMove = (e: MouseEvent) => moveLight(e.x, e.y)
    const touchMove = (e: TouchEvent) => moveLight(e.touches[0].clientX, e.touches[0].clientY)

    window.addEventListener('mousemove', mouseMove)
    window.addEventListener('touchmove', touchMove)
    return () => {
      window.removeEventListener('mousemove', mouseMove)
      window.removeEventListener('touchmove', touchMove)
    }
  }, [isFL])

  const moveLight: MoveFn = useCallback((x, y) => {
    const flashlight = flashlightRef.current!
    flashlight.style.setProperty('--Xpos', `${x}px`)
    flashlight.style.setProperty('--Ypos', `${y}px`)
  }, [])

  return { flashlightRef, moveLight }
}
