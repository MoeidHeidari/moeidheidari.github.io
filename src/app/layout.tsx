import './globals.css'
import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Footer from './components/footer'
import { baseUrl } from './sitemap'
import { Provider } from 'src/components/ui/provider'
import { Box, Flex } from '@chakra-ui/react'
import Navbar from './components/nav'
import React from 'react'

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Next.js Portfolio Starter',
    template: '%s | Next.js Portfolio Starter',
  },
  description: 'This is my portfolio.',
  openGraph: {
    title: 'My Portfolio',
    description: 'This is my portfolio.',
    url: baseUrl,
    siteName: 'My Portfolio',
    locale: 'en_US',
    type: 'website',
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
}

const cx = (...classes: string[]) => classes.filter(Boolean).join(' ')

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html suppressHydrationWarning
      lang="en"
      className={cx(
        GeistSans.variable,
        GeistMono.variable
      )}
    >
      <head>
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");var d=t==="light"||t==="dark"?t:(window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");var e=document.documentElement;e.classList.remove("light","dark");e.classList.add(d);e.style.colorScheme=d;}catch(_){}})();`,
          }}
        />
      </head>
      <body style={{ backgroundColor: 'var(--bg)', color: 'var(--fg)' }}>
        <Provider>
          <Flex
            as="header"
            position="fixed"
            top="0"
            w="100%"
            zIndex="sticky"
            style={{ backgroundColor: 'var(--nav-bg)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' } as React.CSSProperties}
          >
            <Navbar />
          </Flex>
          <main>
            <Box
              maxW="1200px"
              mx="auto"
              pt={{ base: '84px', md: '96px' }}
              px={{ base: 4, md: 8, lg: 12 }}
            >
              {children}
            </Box>
            <Box
              maxW="1200px"
              mx="auto"
              pb={{ base: 8, md: 10 }}
              px={{ base: 4, md: 8, lg: 12 }}
            >
              <Footer />
            </Box>
          <Analytics />
          <SpeedInsights />
        </main>
        </Provider>
      </body>
    </html>
  )
}
