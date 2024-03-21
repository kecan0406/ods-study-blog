import { Button } from '@/components/ui/button'
import Link from 'next/link'

type Props = { title: string; href?: string }
const SectionTitle = ({ title, href }: Props) => {
  if (href) {
    return (
      <Link href={href}>
        <Button variant='link' className='mb-6 p-2'>
          <h2 className='text-2xl'>{title}</h2>
        </Button>
      </Link>
    )
  }

  return (
    <div className='mb-6 inline-flex h-9 items-center p-2 text-sm font-medium text-primary'>
      <h2 className='text-2xl'>{title}</h2>
    </div>
  )
}
export default SectionTitle
