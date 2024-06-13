import { Slot } from '@radix-ui/react-slot'
import { HTMLAttributes, RefObject } from 'react'
import { cn } from 'utils/utils'

export interface CardProps extends HTMLAttributes<HTMLElement> {
  asChild?: boolean
  as?: string
  ref?: RefObject<HTMLElement>
}

const Card = ({ ref, className, asChild, as, ...props }: CardProps) => {
  const Comp = asChild ? Slot : as ?? 'div'
  return (
    <Comp ref={ref} className={cn('rounded-xl border bg-card text-card-foreground shadow', className)} {...props} />
  )
}
Card.displayName = 'Card'

const CardHeader = ({
  ref,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  ref?: RefObject<HTMLDivElement>
}) => <div ref={ref} className={cn('flex flex-col space-y-1.5 p-2', className)} {...props} />
CardHeader.displayName = 'CardHeader'

const CardTitle = ({
  ref,
  className,
  ...props
}: HTMLAttributes<HTMLHeadingElement> & {
  ref?: RefObject<HTMLHeadingElement>
}) => <h3 ref={ref} className={cn('font-semibold leading-none tracking-tight', className)} {...props} />
CardTitle.displayName = 'CardTitle'

const CardDescription = ({
  ref,
  className,
  ...props
}: HTMLAttributes<HTMLParagraphElement> & {
  ref?: RefObject<HTMLParagraphElement>
}) => <p ref={ref} className={cn('text-muted-foreground text-sm', className)} {...props} />
CardDescription.displayName = 'CardDescription'

const CardContent = ({
  ref,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  ref?: RefObject<HTMLDivElement>
}) => <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
CardContent.displayName = 'CardContent'

const CardFooter = ({
  ref,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement> & { ref?: RefObject<HTMLDivElement> }) => (
  <div ref={ref} className={cn('flex items-center p-6 pt-0', className)} {...props} />
)
CardFooter.displayName = 'CardFooter'

export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle }
