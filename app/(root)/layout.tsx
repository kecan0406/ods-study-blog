import Footer from '@/app/components/shared/Footer'
import Header from '@/app/components/shared/Header'
import { ReactNode } from 'react'

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <div className='flex h-screen flex-col'>
      <Header />
      <main className='flex-1 pt-16'>{children}</main>
      <Footer />
    </div>
  )
}
