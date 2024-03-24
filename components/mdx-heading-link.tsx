import { LinkIcon } from 'lucide-react'
import Link from 'next/link'

const MdxHeadingLink = ({ id }: { id?: string }) => {
  return (
    <Link
      href={`#${id}`}
      key={`link-${id}`}
      aria-label='Link to this section'
      className='-ms-5 -me-2 inline-block w-7 text-muted-foreground hover:text-foreground'
    >
      <LinkIcon size={18} />
    </Link>
  )
}

export default MdxHeadingLink
