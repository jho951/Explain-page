import type { Locale } from '@/shared/types';

interface FaqPageProps {
  locale: Locale;
}

const FAQ_COPY = {
  ko: {
    eyebrow: 'FAQ',
    title: '자주 묻는 질문',
    description:
      '현재는 mock Q&A만 먼저 정리한 상태입니다. 실제 운영 전에는 서비스 정책과 API 기준에 맞춰 갱신됩니다.',
    items: [
      {
        question: '이 서비스는 무엇을 위한 페이지인가요?',
        answer:
          'Explain Page는 로그인 진입과 서비스 구조 안내를 담당하는 프론트 페이지입니다. 현재는 에디터 서비스로 진입하기 전 기본 정보를 제공하는 역할을 합니다.',
      },
      {
        question: '로그인은 어떻게 동작하나요?',
        answer:
          '로그인은 Gateway를 통해 처리됩니다. 로그인하지 않은 상태에서 시작하기를 누르면 SSO 로그인 흐름으로 이동하고, 로그인 완료 후에는 서비스 페이지로 연결됩니다.',
      },
      {
        question: '문서 편집은 어디서 하나요?',
        answer:
          '실제 문서 편집은 별도의 에디터 서비스 페이지에서 진행합니다. Explain Page는 그 서비스로 들어가기 전 안내와 진입점을 제공합니다.',
      },
      {
        question: '현재 FAQ 내용은 확정된 정책인가요?',
        answer:
          '아직 아닙니다. 지금 페이지는 mock Q&A이며, 이후 운영 정책과 사용자 지원 기준이 정리되면 실제 내용으로 교체할 예정입니다.',
      },
    ],
  },
  en: {
    eyebrow: 'FAQ',
    title: 'Frequently Asked Questions',
    description:
      'This is a simple mock Q&A page for now. It will be updated later to match the real service policy and API behavior.',
    items: [
      {
        question: 'What is this service page for?',
        answer:
          'Explain Page is the frontend entry page for sign-in and service guidance. Right now it mainly introduces the platform before users move into the editor service.',
      },
      {
        question: 'How does sign-in work?',
        answer:
          'Sign-in is handled through the Gateway. If you are not authenticated and press Get started, the app sends you into the SSO login flow and then forwards you to the service page.',
      },
      {
        question: 'Where do I edit documents?',
        answer:
          'Actual document editing happens in a separate editor service page. Explain Page acts as the guidance and entry point before that handoff.',
      },
      {
        question: 'Is this FAQ final?',
        answer:
          'Not yet. This page currently uses mock Q&A content and will be replaced later with production-ready support information.',
      },
    ],
  },
} satisfies Record<
  Locale,
  {
    eyebrow: string;
    title: string;
    description: string;
    items: { question: string; answer: string }[];
  }
>;

export default function FaqPage({ locale }: FaqPageProps) {
  const copy = FAQ_COPY[locale];

  return (
    <main className="layout-shell layout-stack">
      <section className="surface-panel surface-panel--accent surface-panel--hero">
        <p className="surface-eyebrow">{copy.eyebrow}</p>
        <h1 className="surface-title surface-title--hero">{copy.title}</h1>
        <p className="surface-copy">{copy.description}</p>
      </section>

      <section className="surface-card-grid" aria-label={copy.title}>
        {copy.items.map(item => (
          <article
            className="surface-panel surface-panel--accent surface-panel--card"
            key={item.question}
          >
            <h2 className="surface-card-title">{item.question}</h2>
            <p className="surface-card-copy">{item.answer}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
