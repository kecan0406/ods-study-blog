import ArticleMdxRemote from '@/components/article-mdx'
import { fetchArticle, FrontMatterArticle } from '@/utils/api/blog'
import { mdxRemoteOptions } from '@/utils/md-utils'

export default async function Page({ params }: { params: { slug: string } }) {
  const { matter, content } = await fetchArticle(params.slug)

  return (
    <article className='wrapper py-8 prose prose-zinc md:prose-lg dark:prose-invert prose-figcaption:mt-0'>
      <Header matter={matter} />
      <ArticleMdxRemote options={mdxRemoteOptions} source={content} />
    </article>
  )
}

type HeaderProps = FrontMatterArticle
const Header = ({ matter }: { matter: HeaderProps }) => {
  const { title, releaseDate, readingTime } = matter
  return (
    <header className='flex justify-center flex-col'>
      <h1>{title}</h1>
      <div className='text-sm text-muted-foreground font-semibold'>
        <time dateTime={releaseDate}>{releaseDate}</time>
        <span className='before:px-1 before:content-["•"]'>{readingTime} min</span>
      </div>
    </header>
  )
}
