import './globals.css'
import Footer from 'app/components/shared/footer'
import Header from 'app/components/shared/header'
import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'
import { ReactNode } from 'react'
import { PreloadResources } from './preload-resources'

export const metadata: Metadata = {
  title: 'ODS STUDY',
  description: 'ods study'
}

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <PreloadResources />
      <body className='min-h-screen bg-background font-sans antialiased'>
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
