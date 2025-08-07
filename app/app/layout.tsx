import { RootLayoutProps } from '@/types/layout';

export default function AppLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ko">
      <head>
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body>{children}</body>
    </html>
  );
}
