'use client'
import { ComponentProps, HTMLAttributes } from 'react'
import { cn } from 'utils/utils'
import { Drawer as DrawerPrimitive } from 'vaul'

type DrawerProps = ComponentProps<typeof DrawerPrimitive.Root>
const Drawer = ({ shouldScaleBackground = true, ...props }: DrawerProps) => (
  <DrawerPrimitive.Root shouldScaleBackground={shouldScaleBackground} {...props} />
)
Drawer.displayName = 'Drawer'

const DrawerTrigger = DrawerPrimitive.Trigger
const DrawerPortal = DrawerPrimitive.Portal
const DrawerClose = DrawerPrimitive.Close

type DrawerOverlayProps = ComponentProps<typeof DrawerPrimitive.Overlay>
const DrawerOverlay = ({ ref, className, ...props }: DrawerOverlayProps) => (
  <DrawerPrimitive.Overlay ref={ref} className={cn('fixed inset-0 z-50 bg-black/80', className)} {...props} />
)
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName

type DrawerContentProps = ComponentProps<typeof DrawerPrimitive.Content>
const DrawerContent = ({ ref, className, children, ...props }: DrawerContentProps) => (
  <DrawerPortal>
    <DrawerOverlay ref={ref} />
    <DrawerPrimitive.Content
      ref={ref}
      className={cn(
        'fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] border bg-background',
        className
      )}
      {...props}
    >
      <div className='mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted' />
      {children}
    </DrawerPrimitive.Content>
  </DrawerPortal>
)
DrawerContent.displayName = 'DrawerContent'

const DrawerHeader = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('grid gap-1.5 p-4 text-center sm:text-left', className)} {...props} />
)
DrawerHeader.displayName = 'DrawerHeader'

const DrawerFooter = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('mt-auto flex flex-col gap-2 p-4', className)} {...props} />
)
DrawerFooter.displayName = 'DrawerFooter'

type DrawerTitleProps = ComponentProps<typeof DrawerPrimitive.Title>
const DrawerTitle = ({ ref, className, ...props }: DrawerTitleProps) => (
  <DrawerPrimitive.Title
    ref={ref}
    className={cn('font-semibold text-lg leading-none tracking-tight', className)}
    {...props}
  />
)
DrawerTitle.displayName = DrawerPrimitive.Title.displayName

type DrawerDescriptionProps = ComponentProps<typeof DrawerPrimitive.Description>
const DrawerDescription = ({ ref, className, ...props }: DrawerDescriptionProps) => (
  <DrawerPrimitive.Description ref={ref} className={cn('text-muted-foreground text-sm', className)} {...props} />
)
DrawerDescription.displayName = DrawerPrimitive.Description.displayName

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription
}
