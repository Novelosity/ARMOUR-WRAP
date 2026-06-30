import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ArmorWrap Studio | Kevlar PPF & Premium Detailing',
  description: 'Invisible armor for your vehicle. ArmorWrap Studio delivers Kevlar PPF installation, expert polishing, interior & exterior detailing across Pakistan.',
  keywords: 'PPF, Kevlar PPF, paint protection film, car detailing, ArmorWrap Studio, Pakistan, premium PPF',
  openGraph: {
    title: 'ArmorWrap Studio — Protect. Enhance. Maintain.',
    description: 'Invisible armor for your vehicle. Cinematic PPF studio experience.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}
