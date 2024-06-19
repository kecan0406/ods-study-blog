import { buttonVariants } from 'app/components/ui/button'
import Link from 'next/link'
import { Category } from 'utils/db/graphql'

export function Categories({ category, categories }: { category: string; categories: Category[] }) {
  const categoryLinks = [{ slug: 'all', emoji: '' }, ...categories]

  return (
    <nav className='py-2 uppercase'>
      <ul className='category-anchor flex'>
        {categoryLinks.map(({ slug, emoji }) => (
          <li key={slug} aria-checked={category === slug}>
            <Link className={buttonVariants({ variant: 'ghost' })} href={`/writing/${slug === 'all' ? '' : slug}`}>
              <span className='mr-1' dangerouslySetInnerHTML={{ __html: emoji ?? '' }} />
              {slug}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
