'use client'

import Giscus from '@giscus/react'
import { useTheme } from 'next-themes'

export default function Comments() {
  const { resolvedTheme } = useTheme()
  return (
    <Giscus
      id='comment'
      repo='kecan0406/ods-study-blog'
      repoId='R_kgDOLcAF6g'
      category='Comments'
      categoryId='DIC_kwDOLcAF6s4Ce2Db'
      mapping='pathname'
      theme={`${process.env.NEXT_PUBLIC_URL}/themes/${resolvedTheme}.css`}
      emitMetadata='0'
      reactionsEnabled='0'
      lang='ko'
      inputPosition='bottom'
      loading='lazy'
    />
  )
}
