'use client'

import { preconnect, preinit } from 'react-dom'

export function PreloadResources() {
  preconnect('https://cdn.jsdelivr.net', { crossOrigin: 'anonymous' })
  preinit(
    'https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css',
    { as: 'style', crossOrigin: 'anonymous' }
  )

  return null
}
