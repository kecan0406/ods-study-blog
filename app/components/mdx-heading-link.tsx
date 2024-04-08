import Link from 'next/link'

const MdxHeadingLink = ({ id }: { id?: string }) => {
  return (
    <Link href={`#${id}`} key={`link-${id}`} aria-label='Link to this section' className='anchor'>
      #
    </Link>
  )
}

export default MdxHeadingLink
