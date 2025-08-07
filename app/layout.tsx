import { siteMetadata } from '@/constants/meta';
import { siteViewport } from '@/constants/viewport';
import { RootLayoutProps } from '@/types/layout';

import '@/styles/reset.css';
import '@/styles/font.css';
import '@/styles/theme.css';
import '@/styles/class.css';

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}

export const generateMetadata = async () => siteMetadata;
export const viewport = siteViewport;
