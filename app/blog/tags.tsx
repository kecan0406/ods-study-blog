'use client'

import { usePathname, useRouter } from 'next/navigation'
import { Button } from '../components/ui/button'

export default function Tags({ tags }: { tags: string[] }) {
  const router = useRouter()
  const pathname = usePathname()

  const handleTags = (targetTag: string) => () => {
    const filteredTags = tags.filter((tag) => targetTag !== tag).join(',')
    if (filteredTags.length) {
      router.push(`${pathname}?tags=${filteredTags}`, { scroll: false })
    } else {
      router.push(pathname)
      router.refresh()
    }
  }

  return (
    <div className='flex justify-center gap-2 overflow-hidden py-4'>
      {tags.map((tag) => (
        <Button variant='outline' key={tag} onClick={handleTags(tag)}>
          {tag}
        </Button>
      ))}
    </div>
  )
}
