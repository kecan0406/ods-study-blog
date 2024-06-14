/*
 * 한 폰트에 여러 인스턴스가 호스팅 될 수 있도록 공유 파일을 만들어 상수로 내보냅니다.
 * https://nextjs.org/docs/app/building-your-application/optimizing/fonts#reusing-fonts
 * */
import localFont from 'next/font/local'

const fontSans = localFont({
  src: '../public/fonts/PretendardVariable.subset.woff2',
  weight: '45 920',
  variable: '--font-sans',
  display: 'swap'
})

export default fontSans
