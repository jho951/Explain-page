import { siteMetadata } from '@/shared/config';
import { siteViewport } from '@/shared/config';
import type { AppRootLayoutProps } from '@/app/layout.types';

import '@/shared/styles/reset.css';
import '@/shared/styles/theme.css';
import '@/shared/styles/class.css';
import '../../node_modules/@jho951/ui-components/dist/index.css';

function RootLayout({ children }: AppRootLayoutProps) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}

export default RootLayout;
export const generateMetadata = async () => siteMetadata;
export const viewport = siteViewport;
