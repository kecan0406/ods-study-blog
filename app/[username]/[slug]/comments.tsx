'use client'

import Giscus from '@giscus/react'
import { useTheme } from 'next-themes'
import { useParams } from 'next/navigation'

export default function Comments() {
  const { slug } = useParams()
  const { resolvedTheme } = useTheme()

  return (
    <Giscus
      id='comment'
      repo='ODS-GARAGE/posts'
      repoId='R_kgDOMGEK4Q'
      mapping='number'
      term={slug as string}
      theme={`${process.env.NEXT_PUBLIC_URL}/themes/${resolvedTheme}.css`}
      emitMetadata='0'
      reactionsEnabled='0'
      lang='ko'
      inputPosition='bottom'
      loading='lazy'
    />
  )
}
