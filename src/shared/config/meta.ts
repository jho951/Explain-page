import { Metadata } from 'next';

import { TITLE, DESCRIPTION, PROJECT_URL } from './security';

const siteMetadata: Metadata = {
  title: {
    default: TITLE,
    template: `%s | ${TITLE}`,
  },
  description: DESCRIPTION,
  metadataBase: new URL(PROJECT_URL || 'http://localhost:3000'),

  manifest: '/site.webmanifest',

  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: 'website',
    url: PROJECT_URL || 'http://localhost:3000',
    siteName: TITLE,
  },

  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
  },

  alternates: {
    canonical: PROJECT_URL || 'http://localhost:3000',
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
  },
};

export { siteMetadata };
