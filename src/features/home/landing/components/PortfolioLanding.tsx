import { Locale } from '@/shared/types';
import { ActiveLink } from '@/shared/ui';
import Image from 'next/image';

import styles from './PortfolioLanding.module.css';

interface PortfolioLandingProps {
  locale: Locale;
}

const LANDING_COPY = {
  ko: {
    eyebrow: 'EXPLAIN PAGE',
    brand: 'Explain Page',
    title: '블록 문서 편집을 위한 최소 진입점',
    desc: 'Gateway를 단일 진입점으로 두고 로그인, 세션, 사용자 정보, 문서 API 흐름을 현재 서버 계약에 맞춰 연결합니다.',
    primaryCta: '로그인',
    secondaryCta: '정책 보기',
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
    endpointTitle: 'Gateway 공개 엔드포인트',
    endpointKicker: 'PUBLIC API',
    endpoints: [
      '/v1/auth/sso/start',
      '/v1/auth/exchange',
      '/v1/auth/me',
      '/v1/auth/session',
      '/v1/auth/refresh',
      '/v1/auth/logout',
      '/v1/users/me',
      '/v1/documents/**',
      '/v1/editor-operations/**',
      '/v1/admin/**',
    ],
  },
  en: {
    eyebrow: 'EXPLAIN PAGE',
    brand: 'Explain Page',
    title: 'A minimal entry point for block document editing',
    desc: 'Gateway stays as the single entry point while login, session, user state, and document APIs follow the current server contract.',
    primaryCta: 'Sign in',
    secondaryCta: 'Policies',
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
    endpointTitle: 'Gateway public endpoints',
    endpointKicker: 'PUBLIC API',
    endpoints: [
      '/v1/auth/sso/start',
      '/v1/auth/exchange',
      '/v1/auth/me',
      '/v1/auth/session',
      '/v1/auth/refresh',
      '/v1/auth/logout',
      '/v1/users/me',
      '/v1/documents/**',
      '/v1/editor-operations/**',
      '/v1/admin/**',
    ],
  },
} satisfies Record<
  Locale,
  {
    eyebrow: string;
    brand: string;
    title: string;
    desc: string;
    primaryCta: string;
    secondaryCta: string;
    badges: string[];
    serviceTitle: string;
    serviceKicker: string;
    services: { name: string; role: string }[];
    endpointTitle: string;
    endpointKicker: string;
    endpoints: string[];
  }
>;

export default function PortfolioLanding({ locale }: PortfolioLandingProps) {
  const copy = LANDING_COPY[locale];

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <section className={styles.hero} aria-labelledby="home-title">
          <div className={styles.heroCopy}>
            <div className={styles.brandRow}>
              <Image
                src="/icons/logo.svg"
                alt=""
                width={44}
                height={44}
                className={styles.logoMark}
                priority
              />
              <span>{copy.brand}</span>
            </div>
            <p className={styles.eyebrow}>{copy.eyebrow}</p>
            <h1 id="home-title">{copy.title}</h1>
            <p className={styles.description}>{copy.desc}</p>
            <ul className={styles.badgeList}>
              {copy.badges.map(badge => (
                <li key={badge}>{badge}</li>
              ))}
            </ul>
            <div className={styles.actions}>
              <ActiveLink href="/signin" className={styles.primaryAction}>
                {copy.primaryCta}
              </ActiveLink>
              <ActiveLink href="/legal/terms" className={styles.secondaryAction}>
                {copy.secondaryCta}
              </ActiveLink>
            </div>
          </div>

          <div className={styles.summary} aria-label={copy.serviceTitle}>
            <div className={styles.summaryHeader}>
              <div>
                <p>{copy.serviceKicker}</p>
                <h2>{copy.serviceTitle}</h2>
              </div>
              <Image
                src="/icons/window.svg"
                alt=""
                width={28}
                height={28}
                className={styles.panelIcon}
              />
            </div>

            <div className={styles.servicePanel}>
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

            <div className={styles.endpointPanel}>
              <div className={styles.endpointHeader}>
                <div>
                  <p>{copy.endpointKicker}</p>
                  <h2>{copy.endpointTitle}</h2>
                </div>
                <Image
                  src="/icons/sync.svg"
                  alt=""
                  width={26}
                  height={26}
                  className={styles.panelIcon}
                />
              </div>
              <ul className={styles.endpointList}>
                {copy.endpoints.map(endpoint => (
                  <li key={endpoint}>{endpoint}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
