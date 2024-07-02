import PostExcerpt from 'app/components/post-excerpt'
import { getCategories, getPosts } from 'utils/db/querys'
import { Categories } from './categories'

export const experimental_ppr = true

export default async function CategoryPage({ params }: { params: { category: string } }) {
  const categories = await getCategories()
  const categoryId = categories.find((category) => category.slug === params.category)?.id ?? null
  const posts = await getPosts(categoryId)

  return (
    <article className='wrapper py-4'>
      <Categories categories={categories} category={params.category} />
      <section>
        <ul>
          {posts.map((post) => (
            <li className='mb-4' key={post.slug}>
              <PostExcerpt post={post} />
            </li>
          ))}
        </ul>
      </section>
    </article>
  )
}
