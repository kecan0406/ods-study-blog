import './globals.css'
import Footer from 'app/components/shared/footer'
import Header from 'app/components/shared/header'
import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'
import localFont from 'next/font/local'
import { ReactNode } from 'react'
import { cn } from 'utils/utils'
import { PreloadResources } from './preload-resources'

export const metadata: Metadata = {
  title: 'ODS STUDY',
  description: 'ods study'
}

const fontSans = localFont({
  src: '../public/fonts/PretendardVariable.subset.woff2',
  weight: '45 920',
  variable: '--font-sans',
  display: 'swap'
})

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <PreloadResources />
      <body className={cn('min-h-screen font-sans antialiased', fontSans.variable)}>
        <ThemeProvider attribute='class' defaultTheme='dark' disableTransitionOnChange enableSystem>
          <div className='flex h-screen flex-col'>
            <Header />
            <main className='flex-1 pt-16'>{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
