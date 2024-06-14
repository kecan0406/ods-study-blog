import './globals.css'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Footer from 'app/components/shared/footer'
import Header from 'app/components/shared/header'
import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'
import { ReactNode } from 'react'
import fontSans from 'utils/font'

export const metadata: Metadata = {
  title: 'ODS STUDY',
  description: 'ods study'
}

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`font-sans antialiased ${fontSans.variable}`}>
        <ThemeProvider attribute='class' defaultTheme='dark' disableTransitionOnChange enableSystem>
          <div className='flex min-h-screen flex-col'>
            <Header />
            <main className='flex-1 pt-16'>{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
        <SpeedInsights debug />
      </body>
    </html>
  )
}
