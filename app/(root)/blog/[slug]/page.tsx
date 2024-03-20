import { fetchArticle } from '@/utils/api/blog'
import { Typography } from '@/components/ui/typography'
import ArticleMdxRemote from '@/components/article-mdx'
import { mdxRemoteOptions } from '@/utils/md-utils'

export default async function Page({ params }: { params: { slug: string } }) {
  const { matter, content } = await fetchArticle(params.slug)

  return (
    <div className='wrapper p-16'>
      <time className='text-xs text-muted-foreground' dateTime={matter.releaseDate}>
        {matter.releaseDate}
      </time>
      <Typography variant='h1'>{matter.title}</Typography>
      <article>
        <ArticleMdxRemote options={mdxRemoteOptions} source={content} />
      </article>
    </div>
  )
}
