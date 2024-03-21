import { LinkIcon } from 'lucide-react'
import Link from 'next/link'

const MdxHeadingLink = ({ id }: { id?: string }) => {
  return (
    <Link
      href={`#${id}`}
      aria-label='Link to this section'
      className='-ms-6 inline-block w-6 text-muted-foreground transition-colors hover:text-foreground'
    >
      <LinkIcon size={18} />
    </Link>
  )
}

export default MdxHeadingLink
