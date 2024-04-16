'use client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { MouseEvent } from 'react'
import { Badge } from './ui/badge'

export default function TagBadge({ tag }: { tag: string }) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathName = usePathname()

  const searchParamsTags = searchParams.get('tags')
  const searchTags = searchParamsTags ? searchParamsTags.split(',') : []

  const handleTag = (e: MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!searchTags.includes(tag)) {
      router.push(`${pathName}?tags=${searchTags.concat(tag).join(',')}`)
    }
  }

  return (
    <Badge variant='secondary' className='before:pr-0.5 before:content-["#"]' onClick={handleTag}>
      {tag}
    </Badge>
  )
}
