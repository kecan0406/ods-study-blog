import { fetchArticle } from '@/utils/api/blog'
import { Typography } from '@/components/ui/typography'
import ArticleMdxRemote from '@/components/article-mdx'
import { mdxRemoteOptions } from '@/utils/md-utils'

export default async function Page({ params }: { params: { slug: string } }) {
  const { matter, content } = await fetchArticle(params.slug)

  return (
    <article className='wrapper p-16'>
      <header className='border-b py-8'>
        <div className='flex justify-center pb-2'>
          <time className='text-base font-semibold text-muted-foreground' dateTime={matter.releaseDate}>
            {matter.releaseDate}
          </time>
        </div>
        <Typography variant='h1'>{matter.title}</Typography>
      </header>
      <div className='mt-4'>
        <ArticleMdxRemote options={mdxRemoteOptions} source={content} />
      </div>
    </article>
  )
}
