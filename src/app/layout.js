import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  metadataBase: new URL('https://bluweave-five.vercel.app'),
  title: {
    default: 'Bluweave | Custom Dashboard Solutions',
    template: '%s | Bluweave',
  },
  description: 'Get tailored analytics dashboards built for your business needs. Interactive visualizations, real-time insights, and automated reporting.',
  keywords: ['dashboard', 'analytics', 'data visualization', 'business intelligence', 'custom dashboards', 'data analytics', 'reporting'],
  authors: [{ name: 'Bluweave' }],
  creator: 'Bluweave',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://bluweave-five.vercel.app',
    siteName: 'Bluweave',
    title: 'Bluweave | Custom Dashboard Solutions',
    description: 'Get tailored analytics dashboards built for your business needs. Interactive visualizations, real-time insights, and automated reporting.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bluweave | Custom Dashboard Solutions',
    description: 'Get tailored analytics dashboards built for your business needs. Interactive visualizations, real-time insights, and automated reporting.',
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
    google: 's6CJ37jOmsRf3NxtxYNyqltyUu0PawnIVGaWBRMf_gc',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
