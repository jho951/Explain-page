import type { ReactNode } from 'react';
import NextLink from 'next/link';

import styles from './PortfolioLanding.module.css';

const signalItems = ['Gateway Session', 'Workspace Drafts', 'Blocks API', 'Permissions'];

const valueCards = [
  {
    eyebrow: 'Connected Entry',
    title: '로그인 후 바로 내 에디터 서버 문맥으로 이어집니다.',
    desc: 'GitHub 로그인 이후 세션을 다시 확인하고, 사용자는 별도 설정 없이 바로 작업 화면으로 이어질 수 있습니다.',
  },
  {
    eyebrow: 'Document Surface',
    title: '문서처럼 차분한 화면 안에 서버 동작을 숨깁니다.',
    desc: '사용자에게는 복잡한 인증 흐름 대신 작업 공간만 보이도록, 랜딩에서 진입 맥락과 사용 흐름을 먼저 전달합니다.',
  },
  {
    eyebrow: 'Operational Fit',
    title: '블록, 권한, 사용자 정보를 다루는 프론트 역할에 맞췄습니다.',
    desc: '프론트는 Gateway만 바라보고, 실제 편집 서버와 권한 체계는 뒤에서 안정적으로 연결되는 구조를 전제로 소개합니다.',
  },
];

const flowCards = [
  {
    step: '01',
    title: 'Sign in',
    desc: 'Gateway 세션을 확인하고 에디터 서버에 들어갈 준비를 마칩니다.',
  },
  {
    step: '02',
    title: 'Open workspace',
    desc: '내가 작업하던 문서와 워크스페이스 컨텍스트를 바로 불러옵니다.',
  },
  {
    step: '03',
    title: 'Edit with structure',
    desc: '블록 단위 편집, 설명 보강, 문단 재정리를 한 흐름으로 다룹니다.',
  },
  {
    step: '04',
    title: 'Share and control',
    desc: '사용자 권한과 공개 범위를 확인한 뒤 그대로 공유할 수 있습니다.',
  },
];

const featureCards = [
  {
    tone: 'paper',
    label: 'Workspace',
    title: '빈 화면보다 현재 작업 맥락이 먼저 보이는 시작점',
    desc: '최근 문서, 진행 중 초안, 서버 상태를 한 시선 안에서 보게 해 작업 재진입 비용을 줄입니다.',
  },
  {
    tone: 'mist',
    label: 'Blocks',
    title: '구조를 바꾸기 쉬운 블록 기반 편집 감각',
    desc: '길게 늘어진 텍스트보다 조각난 문서 단위를 다루는 경험을 전면에 둡니다.',
  },
  {
    tone: 'ink',
    label: 'Permissions',
    title: '누가 보고, 수정하고, 배포할지 제어하는 운영 중심 시선',
    desc: '개인 메모형 앱이 아니라 서버와 연결된 팀 문서 환경이라는 점을 카드 구성으로 드러냅니다.',
  },
];

const architectureNotes = [
  '브라우저는 Gateway만 호출하고 내부 서비스 주소는 노출하지 않습니다.',
  '세션 확인 후 사용자 정보와 권한을 불러와 홈에서 자연스럽게 다음 행동으로 이어집니다.',
  '랜딩 문구 자체도 “문서 작성 앱”보다 “에디터 서버 진입 화면”에 맞춰 정리했습니다.',
];

const contactLinks = [
  { label: '에디터 시작', href: '/signin', external: false },
  { label: '개인정보 처리방침', href: '/legal/privacy-policy', external: false },
  { label: '문의하기', href: 'mailto:jho951@naver.com', external: true },
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
          <p className={styles.eyebrow}>EDITOR SERVER FRONT</p>
          <h1 className={styles.heroTitle}>
            내 에디터 서버로
            <br />
            바로 이어지는
            <br />
            문서형 메인 페이지
          </h1>
          <p className={styles.heroDesc}>
            `craft.do`처럼 부드럽고 정리된 첫 인상을 유지하면서도, 실제 역할은 명확합니다. 사용자는
            여기서 로그인하고, 작업 중인 워크스페이스로 들어가고, 서버에 연결된 문서 흐름을
            자연스럽게 이어갑니다.
          </p>
          <div className={styles.heroActions}>
            <ActionLink href="/signin" className={styles.primaryAction}>
              에디터 열기
            </ActionLink>
            <ActionLink href="/legal/terms-of-service" className={styles.secondaryAction}>
              이용 방식 보기
            </ActionLink>
          </div>
          <div className={styles.signalRail}>
            {signalItems.map(item => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>

        <div className={styles.heroVisual}>
          <div className={styles.desktopFrame}>
            <div className={styles.windowBar}>
              <span />
              <span />
              <span />
              <p>editor-server / home</p>
            </div>
            <div className={styles.workspaceShell}>
              <aside className={styles.sidePanel}>
                <p className={styles.panelLabel}>Workspace</p>
                <strong>Spring Launch Notes</strong>
                <ul className={styles.sideList}>
                  <li>Overview draft</li>
                  <li>API change summary</li>
                  <li>Publish checklist</li>
                </ul>
              </aside>

              <div className={styles.editorSurface}>
                <div className={styles.documentCard}>
                  <p className={styles.cardLabel}>Live Document</p>
                  <h2>Editor server status and workspace overview</h2>
                  <p>
                    로그인 이후 문서 초안, 블록 상태, 권한 문맥이 하나의 문서 화면처럼 이어지는
                    구성을 메인에서 먼저 보여줍니다.
                  </p>
                </div>

                <div className={styles.miniGrid}>
                  <article className={styles.miniCard}>
                    <span>Users</span>
                    <strong>128 active</strong>
                    <p>세션 기반으로 사용자 상태를 다시 확인</p>
                  </article>
                  <article className={styles.miniCard}>
                    <span>Blocks</span>
                    <strong>24 synced</strong>
                    <p>문서 조각을 서버 상태와 함께 관리</p>
                  </article>
                  <article className={styles.miniCard}>
                    <span>Publish</span>
                    <strong>Ready</strong>
                    <p>정리된 문서를 바로 공유 가능한 단계로</p>
                  </article>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.valueSection}>
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>WHY THIS HOME</p>
          <h2>메인 페이지가 단순 소개가 아니라 서버 진입의 맥락을 설명합니다.</h2>
          <p>
            사용자는 예쁜 소개보다 먼저 “어디로 들어가고 무엇을 하게 되는지”를 이해해야 합니다.
            그래서 이 홈은 마케팅 카피보다 작업 흐름과 연결성에 더 무게를 둡니다.
          </p>
        </div>
        <div className={styles.valueGrid}>
          {valueCards.map(card => (
            <article key={card.title} className={styles.valueCard}>
              <p className={styles.valueEyebrow}>{card.eyebrow}</p>
              <h3>{card.title}</h3>
              <p>{card.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.flowSection}>
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>ENTRY FLOW</p>
          <h2>홈에서 에디터 서버까지 이어지는 사용 흐름</h2>
        </div>
        <div className={styles.flowGrid}>
          {flowCards.map(card => (
            <article key={card.step} className={styles.flowCard}>
              <p>{card.step}</p>
              <h3>{card.title}</h3>
              <span>{card.desc}</span>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.featureSection}>
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>EDITOR SURFACE</p>
          <h2>문서 화면처럼 보이지만, 실제로는 운영과 연결을 담는 랜딩</h2>
          <p>
            `craft.do` 레퍼런스의 장점은 정보가 부드럽게 배치된다는 점입니다. 여기서는 그 톤을
            유지하되, 워크스페이스와 서버 중심 메시지로 치환했습니다.
          </p>
        </div>
        <div className={styles.featureGrid}>
          {featureCards.map(card => (
            <article key={card.title} className={`${styles.featureCard} ${styles[card.tone]}`}>
              <span>{card.label}</span>
              <h3>{card.title}</h3>
              <p>{card.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.architectureSection}>
        <div className={styles.architectureCard}>
          <div className={styles.architectureCopy}>
            <p className={styles.eyebrow}>SYSTEM FIT</p>
            <h2>현재 프론트 구조와 충돌하지 않는 카피와 화면 구성</h2>
            <p>
              인증은 Gateway 세션 기준으로 유지하고, 브라우저는 공개 API만 호출하는 현재 아키텍처를
              그대로 존중합니다. 홈은 그 구조를 과하게 설명하지 않으면서도, 사용자 기대치를 정확히
              맞추는 역할을 합니다.
            </p>
          </div>
          <ul className={styles.noteList}>
            {architectureNotes.map(note => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className={styles.footerSection}>
        <div className={styles.footerCard}>
          <div>
            <p className={styles.eyebrow}>OPEN WORKSPACE</p>
            <h2>설명 페이지가 아니라 작업 시작 페이지로 보이게 마무리했습니다.</h2>
            <p className={styles.footerDesc}>
              홈에서 바로 로그인하고, 내 에디터 서버 문맥으로 이동하는 흐름을 유지한 채 더 정돈된 첫
              화면을 제공합니다.
            </p>
          </div>
          <div className={styles.footerActions}>
            {contactLinks.map(item => (
              <ActionLink
                key={item.label}
                href={item.href}
                external={item.external}
                className={styles.footerAction}
              >
                {item.label}
              </ActionLink>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
