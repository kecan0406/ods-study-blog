import { MinusIcon, PlusIcon } from '@radix-ui/react-icons'
import { BsList } from 'react-icons/bs'
import { Button } from './ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from './ui/drawer'

export default function DrawerNav() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button aria-label='nav-btn' variant='ghost' size='icon' className='h-10 w-10 rounded-full'>
          <BsList className='size-6' />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className='mx-auto w-full max-w-sm'>
          <DrawerHeader>
            <DrawerTitle>Move Goal</DrawerTitle>
            <DrawerDescription>Set your daily activity goal.</DrawerDescription>
          </DrawerHeader>
          <div className='p-4 pb-0'>
            <div className='flex items-center justify-center space-x-2'>
              <Button variant='outline' size='icon' className='h-8 w-8 shrink-0 rounded-full'>
                <MinusIcon className='h-4 w-4' />
                <span className='sr-only'>Decrease</span>
              </Button>
              <div className='flex-1 text-center'>
                <div className='font-bold text-7xl tracking-tighter'>goal</div>
                <div className='text-[0.70rem] text-muted-foreground uppercase'>Calories/day</div>
              </div>
              <Button variant='outline' size='icon' className='h-8 w-8 shrink-0 rounded-full'>
                <PlusIcon className='h-4 w-4' />
                <span className='sr-only'>Increase</span>
              </Button>
            </div>
            <div className='mt-3 h-[120px]'></div>
          </div>
          <DrawerFooter>
            <Button>Submit</Button>
            <DrawerClose asChild>
              <Button variant='outline'>Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
