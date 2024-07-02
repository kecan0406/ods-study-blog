import PostExcerpt from 'app/components/post-excerpt'
import { getCategories, getPosts } from 'utils/db/querys'
import { Categories } from './[category]/categories'

export const experimental_ppr = true

export default async function WritingPage() {
  const [categories, posts] = await Promise.all([getCategories(), getPosts()])

  return (
    <article className='wrapper py-4'>
      <Categories categories={categories} category='all' />
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
