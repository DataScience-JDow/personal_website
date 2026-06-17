import ActiveNavTracker from '@/components/ActiveNavTracker';
import VisitTracker from '@/components/VisitTracker';
import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { Suspense } from 'react';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Jeremy Dowdy | Data Scientist and Analytics Engineer',
  description:
    'Jeremy Dowdy is a data scientist and analytics engineer focused on pricing intelligence, lakehouse migration, machine learning, executive analytics, and applied AI workflows.',
  keywords: [
    'Jeremy Dowdy',
    'Data Scientist',
    'Analytics Engineer',
    'Data Engineer',
    'Microsoft Fabric',
    'Snowflake',
    'dbt',
    'Power BI',
    'Machine Learning',
    'AI Workflows',
  ],
  authors: [{ name: 'Jeremy Dowdy' }],
  openGraph: {
    title: 'Jeremy Dowdy | Data Scientist and Analytics Engineer',
    description:
      'Pricing intelligence, enterprise data platforms, analytics engineering, ML systems, and applied AI workflows.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jeremy Dowdy | Data Scientist and Analytics Engineer',
    description:
      'Pricing intelligence, enterprise data platforms, analytics engineering, ML systems, and applied AI workflows.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body>
        <ActiveNavTracker />
        <Suspense fallback={null}>
          <VisitTracker />
        </Suspense>
        <main>{children}</main>
        <footer className="site-footer">
          <div className="container footer-inner">
            <p>Jeremy Dowdy</p>
            <p>Data Scientist & Analytics Engineer</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
