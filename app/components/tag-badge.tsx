'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { MouseEvent, Suspense } from 'react'
import { Badge } from './ui/badge'

export default function TagBadge({ tag }: { tag: string }) {
  return (
    <Suspense
      fallback={
        <Badge variant='secondary' className='before:content-["#"]'>
          {tag}
        </Badge>
      }
    >
      <Tag tag={tag} />
    </Suspense>
  )
}

function Tag({ tag }: { tag: string }) {
  const searchParams = useSearchParams()
  const router = useRouter()

  const searchParamsTags = searchParams.get('tags')
  const searchTags = searchParamsTags ? searchParamsTags.split(',') : []

  const handleTag = (e: MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!searchTags.includes(tag)) {
      router.push(`?tags=${searchTags.concat(tag).join(',')}`)
    }
  }

  return (
    <Badge variant='secondary' className='underline-offset-4 hover:underline before:content-["#"]' onClick={handleTag}>
      {tag}
    </Badge>
  )
}
