import Avatar from 'app/components/ui/avatar'
import { buttonVariants } from 'app/components/ui/button'
import { FaRegHeart } from 'react-icons/fa6'

export default async function Sponsors() {
  return (
    <div className='mx-6 box-border flex gap-5 pb-8'>
      <a href='https://github.com/ODS-GARAGE' className='size-32' target='_blank'>
        <Avatar className='object-contain' alt='ODS-GARAGE' size={128} src='https://github.com/ODS-GARAGE.png' />
      </a>
      <div className='flex flex-col gap-2'>
        <div className='font-bold text-2xl text-foreground'>읽어주셔서 감사합니다!</div>
        <p className='font-semibold text-base'>
          이 블로그는 저희가 배운 것들이나 경험들을
          <br />
          기록하고 공유하기위해 만들었습니다.
        </p>
        <p className='text-center font-bold text-lg'>이 글이 마음에 드셨나요?</p>
        <a
          target='_blank'
          href='https://github.com/sponsors/ODS-GARAGE'
          className={buttonVariants({ className: 'font-semibold' })}
        >
          <FaRegHeart className='mr-2 size-4 text-pink-400' />
          Sponsor
        </a>
      </div>
    </div>
  )
}
