import { Metadata } from 'next';
import { TITLE } from '@/shared/config';

const notFoundMetadata: Metadata = {
  title: `404 페이지를 찾을 수 없습니다 - ${TITLE}`,
  description: '요청하신 페이지를 찾을 수 없습니다. URL을 확인하거나 홈으로 이동하세요.',
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: `404 페이지를 찾을 수 없습니다 - ${TITLE}`,
    description: '요청하신 페이지를 찾을 수 없습니다. URL을 확인하거나 홈으로 이동하세요.',
    siteName: TITLE,
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: `404 페이지를 찾을 수 없습니다 - ${TITLE}`,
    description: '요청하신 페이지를 찾을 수 없습니다. URL을 확인하거나 홈으로 이동하세요.',
  },
};

export { notFoundMetadata };
