import type { ReactNode } from 'react';
import NextLink from 'next/link';

import styles from './PortfolioLanding.module.css';

const capabilityItems = [
  'Systematic API Design',
  'Architecture Documentation',
  'Data Modeling',
  'Observability',
];

const productHighlights = [
  {
    title: 'Backend systems that stay stable after launch.',
    desc: '설계 단계에서 끝나지 않고, 운영 이후의 장애 대응과 성능 관찰까지 이어지는 구조를 만듭니다.',
  },
  {
    title: 'Documentation that helps teams move faster.',
    desc: '아키텍처와 정책을 문서로 남겨 의사결정 비용을 줄이고 유지보수 난도를 낮춥니다.',
  },
  {
    title: 'Problem solving backed by measurable results.',
    desc: '지표를 먼저 정의하고 개선 결과를 수치로 확인하는 방식으로 작업합니다.',
  },
];

const projects = [
  {
    tone: 'mint',
    badge: 'Core Project',
    title: '서비스 API 서버 설계 / 구현',
    desc: '도메인 분리, 인증, 예외 처리, 로깅 기준을 한 흐름으로 설계한 대표 백엔드 프로젝트입니다.',
    tags: ['Java', 'Spring', 'JPA', 'REST API'],
    href: 'https://github.com/jho951',
    external: true,
  },
  {
    tone: 'sand',
    badge: 'Data & Infra',
    title: '운영 안정성 개선',
    desc: 'DB 구조, 배포 플로우, 병목 구간을 재정리해 운영 부담을 줄인 작업입니다.',
    tags: ['MySQL', 'Infra', 'Performance'],
    href: '/legal/terms-of-service',
  },
  {
    tone: 'ink',
    badge: 'Engineering',
    title: '구조 / 설계 중심 기술 기록',
    desc: '설계와 패턴, 테스트 전략을 프로젝트 단위의 의사결정 관점에서 정리했습니다.',
    tags: ['Architecture', 'Pattern', 'Test'],
    href: '/legal/privacy-policy',
  },
];

const metrics = [
  { value: '92%', label: 'Positional Error Reduction' },
  { value: '79%', label: 'p95 Latency Improvement' },
  { value: '90%+', label: 'Long Tasks Reduction' },
];

const writings = [
  {
    category: 'Backend',
    title: '운영 관점에서 보는 API 설계 기준',
    desc: '기능 구현보다 오래 남는 인터페이스 설계를 어떻게 잡을지 정리한 글입니다.',
  },
  {
    category: 'Observability',
    title: '문제 상황을 빠르게 수렴시키는 로그 설계법',
    desc: '로그 포인트와 이벤트 기준을 어떻게 잡아야 디버깅 시간이 줄어드는지 다룹니다.',
  },
  {
    category: 'Database',
    title: 'DB 스키마를 바꿀 때 놓치기 쉬운 체크포인트',
    desc: '마이그레이션, 정합성, 운영 영향까지 함께 보는 기준을 정리했습니다.',
  },
];

const awards = [
  {
    date: '2022.02',
    title: '우수 멘티',
    org: '한국장학재단 사회리더 대학생 멘토링 IT',
  },
  {
    date: '2022.10',
    title: '우수 인재상',
    org: '동작구청 우수 SW 인재',
  },
  {
    date: '2025.05',
    title: '프로그래밍 우수상',
    org: '(주) 그랩 우수 프로그램 개발',
  },
];

const contactLinks = [
  { label: 'GitHub', href: 'https://github.com/jho951', external: true },
  { label: 'LinkedIn', href: 'https://www.linkedin.com', external: true },
  { label: 'Email', href: 'mailto:you@example.com', external: false },
];

function ActionLink({
  href,
  children,
  external = false,
  className,
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
  className?: string;
}) {
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    );
  }

  return (
    <NextLink href={href} className={className}>
      {children}
    </NextLink>
  );
}

export default function PortfolioLanding() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>CRAFTED BACKEND PORTFOLIO</p>
          <h1 className={styles.heroTitle}>
            Systematic problem solving
            <br />
            for products that need
            <br />
            sustainable systems.
          </h1>
          <p className={styles.heroDesc}>
            Jangho Lee는 서비스 기능 구현보다 먼저 구조를 설계하고, 운영 이후에도 버틸 수 있는
            기준을 만드는 개발을 지향합니다.
          </p>
          <div className={styles.heroActions}>
            <ActionLink href="https://github.com/jho951" external className={styles.primaryAction}>
              View GitHub
            </ActionLink>
            <ActionLink href="/legal/privacy-policy" className={styles.secondaryAction}>
              Read About
            </ActionLink>
          </div>
          <div className={styles.capabilityRail}>
            {capabilityItems.map(item => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>

        <div className={styles.heroVisual}>
          <div className={styles.appFrame}>
            <div className={styles.windowBar}>
              <span />
              <span />
              <span />
              <p>Backend System Overview</p>
            </div>
            <div className={styles.windowBody}>
              <div className={styles.editorCard}>
                <p className={styles.cardLabel}>SYSTEM MAP</p>
                <h2>Observe, model and stabilize.</h2>
                <p>
                  로그 포인트, 데이터 경계, 장애 시나리오를 먼저 정리한 뒤 구현을 진행하는 흐름을
                  압축해서 보여주는 목업입니다.
                </p>
              </div>
              <div className={styles.stackedNotes}>
                <article className={styles.noteCard}>
                  <strong>API Rules</strong>
                  <span>Auth · Exception · Logging</span>
                </article>
                <article className={styles.noteCard}>
                  <strong>Observability</strong>
                  <span>Structured events for debugging</span>
                </article>
                <article className={styles.noteCard}>
                  <strong>Performance</strong>
                  <span>Measured, compared, documented</span>
                </article>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.highlightStrip}>
        {productHighlights.map(item => (
          <article key={item.title} className={styles.highlightCard}>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </article>
        ))}
      </section>

      <section className={styles.showcase}>
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>PROJECT SHOWCASE</p>
          <h2>실무 흐름으로 정리한 핵심 작업</h2>
          <p>
            기능 설명보다 어떤 기준으로 구조를 만들었는지, 어떤 식으로 운영 리스크를 줄였는지에
            초점을 둔 프로젝트 카드입니다.
          </p>
        </div>

        <div className={styles.projectGrid}>
          {projects.map(project => (
            <article
              key={project.title}
              className={`${styles.projectCard} ${styles[project.tone]}`}
            >
              <p className={styles.projectBadge}>{project.badge}</p>
              <h3>{project.title}</h3>
              <p className={styles.projectText}>{project.desc}</p>
              <div className={styles.projectTags}>
                {project.tags.map(tag => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <ActionLink
                href={project.href}
                external={project.external}
                className={styles.cardAction}
              >
                자세히 보기
              </ActionLink>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.storySection}>
        <div className={styles.storyCard}>
          <div className={styles.storyCopy}>
            <p className={styles.eyebrow}>ABOUT</p>
            <h2>문제를 정리하고, 기준을 남기고, 지표로 검증합니다.</h2>
            <p>
              관광/공공 프로젝트와 의료 영상 제품을 거치며, 기능 구현 그 자체보다 시스템이 오래
              유지되기 위한 기준을 설계하는 일에 집중해왔습니다.
            </p>
            <p>
              제품 내부 로직을 재설계하고 structured logging 기반으로 관찰 지점을 확보해, 재현이
              어려운 문제도 점진적으로 수렴시키는 방식을 선호합니다.
            </p>
          </div>

          <div className={styles.metricPanel}>
            {metrics.map(metric => (
              <div key={metric.label} className={styles.metricCard}>
                <strong>{metric.value}</strong>
                <span>{metric.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.writingSection}>
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>TECH WRITE</p>
          <h2>구조와 운영 관점의 글</h2>
          <p>읽는 즉시 흐름이 보이도록, 문제 정의와 적용 기준을 함께 설명하는 글 묶음입니다.</p>
        </div>
        <div className={styles.writingGrid}>
          {writings.map(item => (
            <article key={item.title} className={styles.writingCard}>
              <span>{item.category}</span>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.awardsSection}>
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>AWARDS</p>
          <h2>검증된 실행력</h2>
        </div>
        <div className={styles.timeline}>
          {awards.map(item => (
            <article key={`${item.date}-${item.title}`} className={styles.timelineItem}>
              <span className={styles.timelineDot} />
              <div>
                <p>{item.date}</p>
                <h3>{item.title}</h3>
                <span>{item.org}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.quoteSection}>
        <blockquote className={styles.quoteCard}>
          <p>
            “ 글의 구조가 체계적이라 막힘없이 읽혔습니다. 서론, 본론, 결론 구성이 아주 깔끔하네요. ”
          </p>
          <footer>User · Blog Visitor</footer>
        </blockquote>
      </section>

      <section className={styles.footerPromo}>
        <div className={styles.footerPromoCard}>
          <div className={styles.footerPromoCopy}>
            <p className={styles.eyebrow}>CONTACT</p>
            <h2>함께 만들고 싶은 제품이 있다면 연결해 주세요.</h2>
            <p>
              협업 제안, 포지션 문의, 기술 이야기 모두 좋습니다. 코드와 문서, 대화가 자연스럽게
              이어지는 방식으로 일하는 편입니다.
            </p>
            <div className={styles.contactRail}>
              {contactLinks.map(item => (
                <ActionLink
                  key={item.label}
                  href={item.href}
                  external={item.external}
                  className={styles.contactPill}
                >
                  {item.label}
                </ActionLink>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
