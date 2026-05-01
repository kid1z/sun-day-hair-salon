import type { Metadata } from 'next'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { Geist } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import { TooltipProvider } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' })

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Sun Day Hair Salon | Salon tóc tại Bình Tân, TP. Hồ Chí Minh',
    template: '%s | Sun Day Hair Salon',
  },
  description:
    'Sun Day Hair Salon cung cấp dịch vụ cắt tóc cao cấp, nhuộm màu chuyên sâu và tạo kiểu dự tiệc tại Bình Tân, TP. Hồ Chí Minh.',
  keywords: [
    'Sun Day Hair Salon',
    'salon tóc Bình Tân',
    'salon tóc TP Hồ Chí Minh',
    'nhuộm tóc Bình Tân',
    'cắt tóc đẹp Bình Tân',
    'tạo kiểu tóc dự tiệc',
    'Sun Day Hair Salon Bình Tân',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Sun Day Hair Salon | Salon tóc tại Bình Tân, TP. Hồ Chí Minh',
    description:
      'Dịch vụ cắt tóc cao cấp, nhuộm màu chuyên sâu và tạo kiểu dự tiệc tại Sun Day Hair Salon.',
    url: '/',
    siteName: 'Sun Day Hair Salon',
    locale: 'vi_VN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sun Day Hair Salon',
    description:
      'Salon tóc tại Bình Tân, TP. Hồ Chí Minh với dịch vụ cắt tóc, nhuộm màu và tạo kiểu chuyên nghiệp.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi" className={cn('font-sans', geist.variable)} suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital,wght@0,400;1,400&family=Barlow:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ClerkProvider>
          <TooltipProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
          </TooltipProvider>
        </ClerkProvider>
      </body>
    </html>
  )
}
