import './globals.css'
import { Inter, Playfair_Display } from 'next/font/google'
import { Metadata } from 'next'
import CosmicBadge from '@/components/CosmicBadge'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'CraftConnect AI - Empowering Local Artisans Globally',
  description: 'AI-powered platform connecting traditional artisans with global audiences through storytelling, authenticity verification, and cultural preservation.',
  keywords: 'artisans, crafts, cultural heritage, AI storytelling, blockchain authenticity, global marketplace',
  authors: [{ name: 'CraftConnect AI Team' }],
  openGraph: {
    title: 'CraftConnect AI - Empowering Local Artisans Globally',
    description: 'AI-powered platform connecting traditional artisans with global audiences',
    type: 'website',
    url: 'https://craftconnect-ai.com',
    siteName: 'CraftConnect AI',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CraftConnect AI - Empowering Local Artisans Globally',
    description: 'AI-powered platform connecting traditional artisans with global audiences',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const bucketSlug = process.env.COSMIC_BUCKET_SLUG as string

  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        {/* Console capture script for dashboard debugging */}
        <script src="/dashboard-console-capture.js" />
      </head>
      <body className="font-sans antialiased">
        <main className="min-h-screen">
          {children}
        </main>
        <CosmicBadge bucketSlug={bucketSlug} />
      </body>
    </html>
  )
}