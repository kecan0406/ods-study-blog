import PostExcerpt from 'app/components/post-excerpt'
import { getCategories, getPosts } from 'utils/db/querys'

export const experimental_ppr = true

export default async function CategoryPage({ params }: { params: { category?: string[] } }) {
  const categories = await getCategories()
  const categoryId = categories.find((category) => category.slug === params.category?.at(0))?.id ?? null
  const posts = await getPosts(categoryId)

  return (
    <ul>
      {posts.map((post) => (
        <li className='mb-4' key={post.slug}>
          <PostExcerpt post={post} />
        </li>
      ))}
    </ul>
  )
}
