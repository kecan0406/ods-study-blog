import { buttonVariants } from 'app/components/ui/button'
import Link from 'next/link'

type Props = { title: string; href?: string }
export default function SectionTitle({ title, href }: Props) {
  if (href) {
    return (
      <Link href={href} className={buttonVariants({ variant: 'link', className: 'mb-2' })}>
        <h2 className='text-2xl'>{title}</h2>
      </Link>
    )
  }

  return (
    <div className='mb-2 inline-flex h-9 items-center font-medium text-primary text-sm'>
      <h2 className='text-2xl'>{title}</h2>
    </div>
  )
}
