import { SpeedInsights } from '@vercel/speed-insights/next'
import Footer from 'app/components/shared/Footer'
import Header from 'app/components/shared/Header'
import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'
import { M_PLUS_2 as FontSans } from 'next/font/google'
import { ReactNode } from 'react'
import { cn } from 'utils/utils'
import './globals.css'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans'
})

export const metadata: Metadata = {
  title: 'ODS STUDY',
  description: 'ods study'
}

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={cn('min-h-screen bg-background font-sans antialiased', fontSans.variable)}>
        <ThemeProvider attribute='class' defaultTheme='dark' disableTransitionOnChange enableSystem>
          <div className='flex h-screen flex-col'>
            <Header />
            <main className='flex-1 pt-16'>{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
        <SpeedInsights />
      </body>
    </html>
  )
}
