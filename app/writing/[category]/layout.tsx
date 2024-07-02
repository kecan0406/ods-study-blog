import { ReactNode } from 'react'
import { getCategories } from 'utils/db/querys'

export const dynamicParams = false
export async function generateStaticParams() {
  const categories = await getCategories()
  return categories.map((category) => ({ category: category.slug }))
}

export default function CategoryLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <>{children}</>
}
