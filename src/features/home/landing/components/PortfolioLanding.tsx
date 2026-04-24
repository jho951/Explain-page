import { Locale } from '@/shared/types';
import Image from 'next/image';
import { Link } from '@/shared/ui';

import styles from './PortfolioLanding.module.css';
import PortfolioLandingCta from './PortfolioLandingCta';

interface PortfolioLandingProps {
  locale: Locale;
}

const LANDING_COPY = {
  ko: {
    eyebrow: 'EXPLAIN PAGE',
    title: '에디터 서비스',
    desc: 'Gateway를 단일 진입점으로 두고 로그인, 세션, 사용자 정보, 문서 API 흐름을 현재 서버 계약에 맞춰 연결합니다.',
    primaryCta: '시작하기',
    badges: ['Gateway :8080', 'Cookie session', 'Block document'],
    serviceTitle: '현재 연결 기준',
    serviceKicker: 'SERVICE MAP',
    services: [
      { name: 'explain-page', role: 'UI' },
      { name: 'gateway-service', role: 'Edge' },
      { name: 'auth-service', role: 'SSO' },
      { name: 'user-service', role: 'User' },
      { name: 'authz-service', role: 'Admin check' },
      { name: 'redis-service', role: 'Session' },
      { name: 'monitoring-service', role: 'Metrics' },
    ],
    repoTitle: '레포지토리',
    repoKicker: 'REPOSITORIES',
    repositories: [
      {
        title: '1. 서비스 레포',
        links: [
          'https://github.com/jho951/service-gateway',
          'https://github.com/jho951/service-redis',
          'https://github.com/jho951/service-user',
          'https://github.com/jho951/service-auth',
          'https://github.com/jho951/service-authz',
          'https://github.com/jho951/service-editor',
        ],
      },
      {
        title: '2. 프론트 페이지 레포',
        links: ['https://github.com/jho951/page-explain', 'https://github.com/jho951/page-editor'],
      },
      {
        title: '3. 계약 레포',
        links: ['https://github.com/jho951/contract-service'],
      },
    ],
  },
  en: {
    eyebrow: 'EXPLAIN PAGE',
    title: 'A minimal entry point for block document editing',
    desc: 'Gateway stays as the single entry point while login, session, user state, and document APIs follow the current server contract.',
    primaryCta: 'Get started',
    badges: ['Gateway :8080', 'Cookie session', 'Block document'],
    serviceTitle: 'Current service baseline',
    serviceKicker: 'SERVICE MAP',
    services: [
      { name: 'explain-page', role: 'UI' },
      { name: 'gateway-service', role: 'Edge' },
      { name: 'auth-service', role: 'SSO' },
      { name: 'user-service', role: 'User' },
      { name: 'authz-service', role: 'Admin check' },
      { name: 'redis-service', role: 'Session' },
      { name: 'monitoring-service', role: 'Metrics' },
    ],
    repoTitle: 'Repositories',
    repoKicker: 'REPOSITORIES',
    repositories: [
      {
        title: '1. Service repos',
        links: [
          'https://github.com/jho951/service-gateway',
          'https://github.com/jho951/service-redis',
          'https://github.com/jho951/service-user',
          'https://github.com/jho951/service-auth',
          'https://github.com/jho951/service-authz',
          'https://github.com/jho951/service-editor',
        ],
      },
      {
        title: '2. Frontend page repos',
        links: ['https://github.com/jho951/page-explain', 'https://github.com/jho951/page-editor'],
      },
      {
        title: '3. Contract repos',
        links: ['https://github.com/jho951/contract-service'],
      },
    ],
  },
} satisfies Record<
  Locale,
  {
    eyebrow: string;
    title: string;
    desc: string;
    primaryCta: string;
    badges: string[];
    serviceTitle: string;
    serviceKicker: string;
    services: { name: string; role: string }[];
    repoTitle: string;
    repoKicker: string;
    repositories: { title: string; links: string[] }[];
  }
>;

export default function PortfolioLanding({ locale }: PortfolioLandingProps) {
  const copy = LANDING_COPY[locale];

  return (
    <div className={styles.page}>
      <main className={`layout-shell layout-shell--wide ${styles.main}`}>
        <section className={styles.hero} aria-labelledby="home-title">
          <div className={`surface-panel surface-panel--accent ${styles.heroCopy}`}>
            <p className="surface-eyebrow">{copy.eyebrow}</p>
            <p id="home-title" className={`surface-title ${styles.heroTitle}`}>
              {copy.title}
            </p>
            <p className={`surface-copy ${styles.description}`}>{copy.desc}</p>
            <ul className={`surface-pill-list ${styles.badgeList}`}>
              {copy.badges.map(badge => (
                <li className="surface-pill" key={badge}>
                  {badge}
                </li>
              ))}
            </ul>
            <div className={styles.actions}>
              <PortfolioLandingCta
                className={styles.primaryAction}
                locale={locale}
                label={copy.primaryCta}
              />
            </div>
          </div>

          <div
            className={`surface-panel surface-panel--ink ${styles.summary}`}
            aria-label={copy.serviceTitle}
          >
            <div className={styles.summaryHeader}>
              <div>
                <p className="surface-kicker">{copy.serviceKicker}</p>
                <h2 className="surface-title">{copy.serviceTitle}</h2>
              </div>
              <Image
                src="/icons/window.svg"
                alt=""
                width={28}
                height={28}
                className={styles.panelIcon}
              />
            </div>

            <div className={`surface-subpanel ${styles.servicePanel}`}>
              <ul className={styles.serviceList}>
                {copy.services.map(service => (
                  <li key={service.name}>
                    <span className={styles.statusDot} />
                    <strong>{service.name}</strong>
                    <em>{service.role}</em>
                  </li>
                ))}
              </ul>
            </div>

            <div className={`surface-subpanel ${styles.endpointPanel}`}>
              <div className={styles.endpointHeader}>
                <div>
                  <p className="surface-kicker">{copy.repoKicker}</p>
                  <h2 className="surface-title">{copy.repoTitle}</h2>
                </div>
                <Image
                  src="/icons/sync.svg"
                  alt=""
                  width={26}
                  height={26}
                  className={styles.panelIcon}
                />
              </div>
              <div className={styles.repoGroups}>
                {copy.repositories.map(group => (
                  <section key={group.title} className={styles.repoGroup}>
                    <h3 className={styles.repoGroupTitle}>{group.title}</h3>
                    <ul className={styles.endpointList}>
                      {group.links.map(link => (
                        <li key={link}>
                          <Link className={styles.repoLink} href={link}>
                            {link}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </section>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
