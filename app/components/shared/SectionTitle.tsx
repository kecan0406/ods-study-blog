import { Button } from 'app/components/ui/button'
import Link from 'next/link'

type Props = { title: string; href?: string }
export default function SectionTitle({ title, href }: Props) {
  if (href) {
    return (
      <Link href={href}>
        <Button variant='link' className='px-0 mb-2'>
          <h2 className='text-2xl'>{title}</h2>
        </Button>
      </Link>
    )
  }

  return (
    <div className='mb-2 inline-flex h-9 items-center text-sm font-medium text-primary'>
      <h2 className='text-2xl'>{title}</h2>
    </div>
  )
}
