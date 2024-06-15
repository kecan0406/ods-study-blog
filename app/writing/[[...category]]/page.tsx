import PostExcerpt from 'app/components/post-excerpt'
import { Discussion } from 'utils/db/graphql'
import { getCategories, getDiscussions } from 'utils/db/querys'

export const experimental_ppr = true

const fetchPosts = async (categoryId: string | null): Promise<Discussion[]> => {
  const posts = await getDiscussions(categoryId)
  return posts.map(({ node }) => node)
}

export default async function CategoryPage({ params }: { params: { category?: string[] } }) {
  const categories = await getCategories()
  const posts = await fetchPosts(categories.find((category) => category.slug === params.category?.at(0))?.id ?? null)

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
