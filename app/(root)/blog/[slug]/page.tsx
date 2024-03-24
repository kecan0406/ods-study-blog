import ArticleMdxRemote from '@/components/article-mdx'
import { fetchArticle } from '@/utils/api/blog'
import { mdxRemoteOptions } from '@/utils/md-utils'

export default async function Page({ params }: { params: { slug: string } }) {
  const { matter, content } = await fetchArticle(params.slug)

  return (
    <article className='wrapper pt-16 prose prose-zinc md:prose-lg lg:prose-xl dark:prose-invert prose-figcaption:mt-0'>
      <header className='flex justify-center flex-col'>
        <time className='mb-2 text-center font-semibold text-muted-foreground' dateTime={matter.releaseDate}>
          {matter.releaseDate}
        </time>
        <h1>{matter.title}</h1>
      </header>
      <ArticleMdxRemote options={mdxRemoteOptions} source={content} />
    </article>
  )
}
