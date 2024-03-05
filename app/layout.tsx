import type { Metadata } from 'next'
import { M_PLUS_2 as FontSans } from 'next/font/google'
import './globals.css'
import { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import ThemeProvider from '@/components/theme-provider'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans'
})

export const metadata: Metadata = {
  title: 'ODS STUDY',
  description: 'ods study'
}

export default function RootLayout({
  children
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          disableTransitionOnChange
          enableSystem
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
