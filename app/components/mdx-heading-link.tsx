import Link from 'next/link'

export default async function MdxHeadingLink({ id }: { id?: string }) {
  return (
    <Link href={`#${id}`} key={`link-${id}`} aria-label='Link to this section' className='anchor'>
      #
    </Link>
  )
}
