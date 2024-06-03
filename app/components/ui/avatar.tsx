import Image, { ImageProps } from 'next/image'
import { cn } from 'utils/utils'

type AvatarProps = { size: number } & ImageProps
export default function Avatar({ size, src, className, ...props }: AvatarProps) {
  return (
    <Image
      {...props}
      className={cn('rounded-full', className)}
      width={size}
      height={size}
      src={`${src}?size=${size}`}
    />
  )
}
