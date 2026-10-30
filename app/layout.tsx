import type { Metadata } from 'next'
import '@fontsource-variable/inter'
import '@fontsource-variable/inter-tight'
import '@fontsource/roboto-mono/400.css'
import './globals.css'

export const metadata: Metadata = {
  title: 'Greenbird — Private markets. Possibilities, expanded.',
  description: 'Private equity and market-linked notes through a single account.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
