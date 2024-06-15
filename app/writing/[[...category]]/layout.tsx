import { ReactNode } from 'react'
import { getCategories } from 'utils/db/querys'
import { Categories } from './categories'

export const dynamicParams = false
export async function generateStaticParams() {
  const categories = await getCategories()
  return categories.map(({ slug }) => ({ category: [slug] })).concat({ category: [] })
}

export default async function CategoryLayout({
  children,
  params
}: Readonly<{ children: ReactNode; params: { category?: string[] } }>) {
  const categories = await getCategories()

  return (
    <article className='wrapper py-4'>
      <Categories categories={categories} category={params.category?.at(0) ?? 'all'} />
      {children}
    </article>
  )
}
