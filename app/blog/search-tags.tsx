'use client'

import { useRouter } from 'next/navigation'
import { Button } from '../components/ui/button'

export default function SearchTags({ tags }: { tags: string[] }) {
  const router = useRouter()

  const handleTags = (targetTag: string) => () => {
    const filteredTags = tags.filter((tag) => targetTag !== tag).join(',')

    if (filteredTags.length) {
      router.push(`/blog?tags=${filteredTags}`)
    } else {
      router.push('/blog')
      router.refresh()
    }
  }

  return (
    <div className='flex justify-center gap-2 overflow-hidden py-4'>
      {tags.map((tag) => (
        <Button variant='ghost' className='before:content-["#"]' key={tag} onClick={handleTags(tag)}>
          {tag}
        </Button>
      ))}
    </div>
  )
}
