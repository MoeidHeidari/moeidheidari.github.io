import './globals.css'
import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Footer from './components/footer'
import { baseUrl } from './sitemap'
import { Provider } from 'src/components/ui/provider'
import { AbsoluteCenter, Box, Flex } from '@chakra-ui/react'
import Navbar from './components/nav'

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
        'text-black bg-white dark:text-white dark:bg-black',
        GeistSans.variable,
        GeistMono.variable
      )}
    >
      <body >
        <Provider >
          <Flex 
  as="header"
  position="fixed"
  top="0"
  backdropBlur={'md'}
  backdropFilter="auto"
  backgroundColor={'blackAlpha.700'}
  w="100%"
  h={70}
  zIndex="sticky"
  p={2}
>
  <Navbar />
</Flex>
          
          
        <main>
          <Box px="14%" py={20}>

          {children}
          </Box>
          <Box px="14%" py={100}>
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
