import type { Viewport } from 'next';

export const siteViewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  interactiveWidget: 'resizes-content',
  themeColor: [
    {
      media: '(prefers-color-scheme: light)',
      color: '#f5faff',
    },
    {
      media: '(prefers-color-scheme: dark)',
      color: '#121b25',
    },
  ],
};
