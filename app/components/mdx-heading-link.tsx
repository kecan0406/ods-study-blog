export default async function MdxHeadingLink({ id }: { id?: string }) {
  return (
    <a href={`#${id}`} key={`link-${id}`} aria-label='Link to this section' className='anchor'>
      #
    </a>
  )
}
