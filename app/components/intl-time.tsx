import { HTMLProps } from 'react'

type IntlTimeProps = { date: string } & HTMLProps<HTMLTimeElement>
export default function IntlTime({ date, ...props }: IntlTimeProps) {
  const dateTime = new Intl.DateTimeFormat('ko-KR').format(new Date(date))
  return (
    <time {...props} dateTime={dateTime}>
      {dateTime}
    </time>
  )
}
