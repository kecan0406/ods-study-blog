'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group'

export type SortValue = 'latest' | 'top'
const SORT_GROUP: SortValue[] = ['latest', 'top']

export function PostSortToggle() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [sort, setSort] = useState<SortValue>(() => (searchParams.get('sort') ?? 'latest') as SortValue)

  const handleSort = (value: SortValue) => {
    if (!value) return
    router.push(`?sort=${value}`)
    setSort(value)
  }

  return (
    <ToggleGroup defaultValue='latest' onValueChange={handleSort} value={sort} type='single'>
      {SORT_GROUP.map((item) => (
        <ToggleGroupItem className='capitalize' key={item} value={item} aria-label={`Toggle ${item}`}>
          {item}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  )
}
