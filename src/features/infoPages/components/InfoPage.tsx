import { notFound } from 'next/navigation';

import type { Locale } from '@/shared/types';

import styles from './InfoPage.module.css';

type InfoPageKey = 'service' | 'brand';

interface InfoPageProps {
  locale: Locale;
  pageKey: InfoPageKey;
}

const INFO_PAGE_COPY = {
  ko: {
    service: {
      eyebrow: 'SERVICE',
      title: '서비스 소개',
      description:
        '현재 이 페이지는 mock 소개 페이지입니다. 실제 운영 전에는 서비스 구조, 기능 범위, 사용자 플로우 중심으로 구체화될 예정입니다.',
      sections: [
        {
          title: '무엇을 제공하나요?',
          body: '에디터 서비스 진입 전 기본 소개, 로그인 진입, 현재 연결된 서비스 구조를 한 번에 보여주는 역할을 합니다.',
        },
        {
          title: '현재 상태',
          body: '지금은 mock 콘텐츠만 반영되어 있으며, 이후 정책과 실제 기능 흐름에 맞춰 정식 설명 문구로 교체됩니다.',
        },
        {
          title: '다음 단계',
          body: '서비스 목적, 대상 사용자, 주요 기능, API 연동 범위를 기준으로 문서를 정리할 예정입니다.',
        },
      ],
    },
    brand: {
      eyebrow: 'BRAND',
      title: '브랜드 에셋',
      description:
        '현재는 mock 브랜드 안내 페이지입니다. 정식 에셋 공개 전이라 간단한 설명과 placeholder 정보만 제공합니다.',
      sections: [
        {
          title: '브랜드 사용',
          body: '로고, 색상, 명칭 사용 기준은 추후 정식 가이드와 함께 제공될 예정입니다.',
        },
        {
          title: '에셋 범위',
          body: '기본 로고, 아이콘, 컬러 가이드, 간단한 사용 예시가 포함되는 방향으로 준비 중입니다.',
        },
        {
          title: '배포 상태',
          body: '아직 실제 다운로드 가능한 브랜드 파일은 연결하지 않았고, 이 페이지는 mock 상태입니다.',
        },
      ],
    },
  },
  en: {
    service: {
      eyebrow: 'SERVICE',
      title: 'Service',
      description:
        'This is currently a mock service page. Before launch, it will be replaced with clearer information about product scope, capabilities, and user flow.',
      sections: [
        {
          title: 'What does it provide?',
          body: 'It explains the entry flow into the editor service, sign-in, and the currently connected service structure in one place.',
        },
        {
          title: 'Current status',
          body: 'Only mock content is shown for now, and it will later be replaced with production-ready service copy.',
        },
        {
          title: 'Next step',
          body: 'The page will later be expanded with clearer product goals, target users, main features, and integration scope.',
        },
      ],
    },
    brand: {
      eyebrow: 'BRAND',
      title: 'Brand Assets',
      description:
        'This is a mock brand page for now. Before official asset release, it only contains lightweight placeholder content.',
      sections: [
        {
          title: 'Brand usage',
          body: 'Rules for logo, naming, and color usage will be published later in a proper brand guide.',
        },
        {
          title: 'Asset scope',
          body: 'The intended package includes logo files, icons, color rules, and a few basic usage examples.',
        },
        {
          title: 'Release status',
          body: 'No downloadable brand files are connected yet, and this page is still in mock form.',
        },
      ],
    },
  },
} satisfies Record<
  Locale,
  Record<
    InfoPageKey,
    {
      eyebrow: string;
      title: string;
      description: string;
      sections: { title: string; body: string }[];
    }
  >
>;

export default function InfoPage({ locale, pageKey }: InfoPageProps) {
  const copy = INFO_PAGE_COPY[locale]?.[pageKey];

  if (!copy) {
    notFound();
  }

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <p className={styles.eyebrow}>{copy.eyebrow}</p>
        <h1 className={styles.title}>{copy.title}</h1>
        <p className={styles.description}>{copy.description}</p>
      </section>

      <section className={styles.grid} aria-label={copy.title}>
        {copy.sections.map(section => (
          <article key={section.title} className={styles.card}>
            <h2 className={styles.cardTitle}>{section.title}</h2>
            <p className={styles.cardBody}>{section.body}</p>
          </article>
        ))}
      </section>
    </main>
  );
}

export type { InfoPageKey };
