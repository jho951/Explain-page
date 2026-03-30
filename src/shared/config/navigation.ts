import type { NavigationSocialLink, NavigationTreeLink } from '@/shared/types';

/** community Nav 메뉴 */
export const COMMUNITY: NavigationTreeLink = {
  id: 'community',
  href: '/community',
  label: 'Community',
  children: [
    { id: 'linkedIn', label: 'Linked In', href: 'https://www.linkedin.com/company/yourcompany' },
    { id: 'slack', label: 'Slack', href: 'https://yourdomain.slack.com' },
    { id: 'discord', label: 'Discord', href: 'https://discord.gg/2TFw8rZD' },
  ],
};

/** support Nav 메뉴 */
export const SUPPORT: NavigationTreeLink = {
  id: 'support',
  href: '/support',
  label: 'Support',
  children: [
    { id: 'contact', label: 'Contact', href: 'mailto:jho951@naver.com' },
    { id: 'faq', label: 'FAQ', href: '/community/faq' },
  ],
};

/** download Nav 메뉴 */
// const DOWNLOAD: NavigationTreeLink = {
//   id: 'download',
//   href: '/download',
//   label: 'DOWNLOAD',
//   children: [
//     {
//       id: 'iphone',
//       label: 'iPhone',
//       href: 'https://apps.apple.com/app/id0000000000',
//       target: '_blank',
//     },
//     {
//       id: 'ipad',
//       label: 'iPad',
//       href: 'https://apps.apple.com/app/id0000000000',
//       target: '_blank',
//     },
//     {
//       id: 'android',
//       label: 'Craft for Android',
//       href: 'https://play.google.com/store/apps/details?id=com.yourcompany.craft',
//       target: '_blank',
//     },
//     {
//       id: 'mac',
//       label: 'Craft for Mac',
//       href: 'https://yourdomain.com/download/mac',
//       target: '_blank',
//     },
//     {
//       id: 'window',
//       label: 'Craft for Windows',
//       href: 'https://yourdomain.com/download/windows',
//       target: '_blank',
//     },
//   ],
// };

/** legal Nav 메뉴 */
export const LEGAL: NavigationTreeLink = {
  id: 'legal',
  href: '/legal',
  label: 'Legal',

  children: [
    { id: 'privacy', label: 'Privacy', href: '/legal/privacy' },
    { id: 'terms', label: 'Terms', href: '/legal/terms' },
    { id: 'secure', label: 'Security', href: '/legal/security' },
    { id: 'esg', label: 'ESG', href: '/legal/esg' },
    { id: 'responsible', label: 'Responsible Disclosure', href: '/legal/responsible-disclosure' },
  ],
};

/** about Nav 메뉴 */
export const ABOUT: NavigationTreeLink = {
  id: 'about',
  href: '/about',
  label: 'About',

  children: [
    { id: 'service', label: 'Service', href: '/service' },
    { id: 'brand', label: 'Brand Assets', href: '/brand' },
    { id: 'careers', label: 'Careers', href: '/careers', target: '_blank' },
  ],
};

/**
 * 푸터 sns_link
 */
export const SNS_LINK: NavigationSocialLink[] = [
  {
    id: 'Git',
    href: 'https://github.com/jho951',
    icon: 'git',
    external: true,
  },
];

export const GNB: NavigationTreeLink[] = [
  { id: 'about', href: '/about', label: 'about', children: [] },
  { id: 'community', href: '/community', label: 'community', children: [] },
  { id: 'legal', href: '/legal', label: 'legal', children: [] },
  { id: 'support', href: '/support', label: 'support', children: [] },
  { id: 'download', href: '/download', label: 'download', children: [] },
];

export const FNB: NavigationTreeLink[] = [ABOUT, COMMUNITY, LEGAL, SUPPORT];

/** 해당 페이지에서는 헤더가 렌더되지 않습니다. */
export const HEADER_EXCLUDED_PATHS = ['/signin', '/auth/callback'];
/** 해당 페이지에서는 푸터가 렌더되지 않습니다. */
export const FOOTER_EXCLUDED_PATHS = ['/signin', '/auth/callback'];
