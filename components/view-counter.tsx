import { getPostCount } from '@/app/db/querys'

type ViewCounterProps = { slug: string }
const ViewCounter = async ({ slug }: ViewCounterProps) => {
  const count = await getPostCount(slug)
  return <>{count.toLocaleString()} views</>
}

export default ViewCounter
