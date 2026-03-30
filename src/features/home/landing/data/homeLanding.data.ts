import { Locale } from '@/shared/types';

type HomeLandingData = {
  signalItems: string[];
  valueCards: { eyebrow: string; title: string; desc: string }[];
  flowCards: { step: string; title: string; desc: string }[];
  featureCards: { tone: 'paper' | 'mist' | 'ink'; label: string; title: string; desc: string }[];
  architectureNotes: string[];
  contactLinks: { label: string; href: string; external: boolean }[];
  hero: {
    title: [string, string, string];
    desc: string;
    primaryCta: string;
    secondaryCta: string;
    windowTitle: string;
    liveDocDesc: string;
    documentsDesc: string;
    blocksDesc: string;
    sharingDesc: string;
  };
  valueSection: {
    title: string;
    desc: string;
  };
  flowSection: {
    title: string;
  };
  featureSection: {
    title: string;
    desc: string;
  };
  architectureSection: {
    title: string;
    desc: string;
  };
  footerSection: {
    title: string;
    desc: string;
  };
};

const HOME_LANDING_DATA: Record<Locale, HomeLandingData> = {
  ko: {
    signalItems: ['Block Editor', 'Real-time Sync', 'Workspace', 'Share Controls'],
    valueCards: [
      {
        eyebrow: 'Block-first Writing',
        title: '문단이 아니라 블록 단위로 생각을 조립합니다.',
        desc: '한 줄, 토글, 체크리스트, 코드 블록을 자유롭게 배치해 긴 문서도 구조적으로 관리할 수 있습니다.',
      },
      {
        eyebrow: 'Document That Feels Alive',
        title: 'craft.do처럼 차분하지만, 팀 작업에 맞는 흐름을 담았습니다.',
        desc: '페이지는 단순한 메모장이 아니라 실시간 상태, 워크스페이스 문맥, 공유 준비 상태를 함께 보여줍니다.',
      },
      {
        eyebrow: 'From Draft To Publish',
        title: '초안 작성부터 공유까지 한 화면에서 이어집니다.',
        desc: '정리 중인 블록을 재배치하고 권한을 지정한 뒤, 링크 공유까지 같은 흐름에서 끝낼 수 있습니다.',
      },
    ],
    flowCards: [
      {
        step: '01',
        title: 'Start with blocks',
        desc: '빈 페이지에서 바로 블록을 추가하며 생각을 빠르게 풀어냅니다.',
      },
      {
        step: '02',
        title: 'Shape the document',
        desc: '드래그로 순서를 바꾸고 섹션을 나눠 읽기 좋은 구조로 정리합니다.',
      },
      {
        step: '03',
        title: 'Sync with workspace',
        desc: '워크스페이스 상태와 연결해 문서 흐름을 팀 단위로 이어갑니다.',
      },
      {
        step: '04',
        title: 'Share with control',
        desc: '보기/수정 권한을 설정하고 필요한 대상에게 안전하게 공유합니다.',
      },
    ],
    featureCards: [
      {
        tone: 'paper',
        label: 'Editor Surface',
        title: '집중을 깨지 않는 문서 중심 인터페이스',
        desc: '필요한 도구만 드러나고 콘텐츠가 중심이 되는 배치로, 작성 흐름을 끊지 않습니다.',
      },
      {
        tone: 'mist',
        label: 'Structured Blocks',
        title: '블록 이동과 재조합이 쉬운 편집 감각',
        desc: '문서가 길어져도 블록 단위로 맥락을 유지하면서 빠르게 재정리할 수 있습니다.',
      },
      {
        tone: 'ink',
        label: 'Collaboration',
        title: '권한과 공유를 고려한 팀 문서 운영',
        desc: '개인 노트에 머물지 않고, 팀이 안전하게 함께 쓰는 문서 환경을 전제로 설계했습니다.',
      },
    ],
    architectureNotes: [
      '브라우저는 Gateway API만 호출해 내부 서비스 경로를 노출하지 않습니다.',
      '인증 세션 확인 후 사용자/권한 정보를 받아 블록 편집 흐름으로 자연스럽게 연결합니다.',
      '메인 카피 자체를 블록 에디터의 실제 사용 흐름에 맞춰 과장 없이 구성했습니다.',
    ],
    contactLinks: [
      { label: '에디터 시작', href: '/signin', external: false },
      { label: '이용약관', href: '/legal/terms', external: false },
      { label: '문의하기', href: 'mailto:jho951@naver.com', external: true },
    ],
    hero: {
      title: ['Craft 스타일의', '블록형 문서 경험을', '우리 워크스페이스로'],
      desc: '작성, 정리, 공유가 끊기지 않도록 화면을 구성했습니다. 한 줄 메모부터 긴 문서까지 블록 단위로 쌓고, 재배치하고, 팀과 공유하는 흐름을 메인에서 바로 이해할 수 있습니다.',
      primaryCta: '에디터 열기',
      secondaryCta: '서비스 정책 보기',
      windowTitle: 'block-editor / workspace',
      liveDocDesc:
        '문서를 쓸수록 길어지는 대신, 블록을 쌓고 정리하는 구조로 바꿔 편집 난이도를 낮춥니다. 워크스페이스 상태와 권한 맥락도 같은 화면에서 이어집니다.',
      documentsDesc: '최근 수정 문서와 초안을 즉시 재진입',
      blocksDesc: '블록 구조를 실시간 상태와 함께 유지',
      sharingDesc: '팀 권한 범위를 확인하고 안전하게 공유',
    },
    valueSection: {
      title: '문서를 쓰는 도구가 아니라 문서를 운영하는 흐름을 소개합니다.',
      desc: '이 페이지는 감성 카피보다 실제 사용 흐름을 먼저 설명합니다. 사용자가 첫 화면에서 "어떻게 쓰고, 어떻게 공유하는지"를 바로 이해하도록 구성했습니다.',
    },
    flowSection: {
      title: '한 번의 진입으로 작성부터 공유까지 이어지는 흐름',
    },
    featureSection: {
      title: 'craft.do 감성의 정돈된 톤을 블록 중심 워크플로우로 연결했습니다.',
      desc: '차분한 문서 UI 톤은 유지하되, 팀 편집과 권한 운영이라는 실제 요구를 반영해 서비스 소개를 재구성했습니다.',
    },
    architectureSection: {
      title: '현재 인증/게이트웨이 구조와 맞물리는 랜딩 구성',
      desc: '메인 화면은 디자인만 예쁜 소개가 아니라, 실제 서비스 구조와 사용자 기대치를 맞추는 진입점입니다. 그래서 카피와 레이아웃 모두 현재 아키텍처 제약 안에서 설계했습니다.',
    },
    footerSection: {
      title: '소개 페이지를 넘어, 실제 작업 시작점으로 마무리합니다.',
      desc: '로그인 후 바로 내 워크스페이스로 진입해 블록 편집을 시작할 수 있도록 행동 중심 CTA를 배치했습니다.',
    },
  },
  en: {
    signalItems: ['Block Editor', 'Real-time Sync', 'Workspace', 'Share Controls'],
    valueCards: [
      {
        eyebrow: 'Block-first Writing',
        title: 'Build ideas block by block, not paragraph by paragraph.',
        desc: 'Mix lines, toggles, checklists, and code blocks to keep long documents structured and easy to edit.',
      },
      {
        eyebrow: 'Document That Feels Alive',
        title: 'A calm craft.do-like tone with a workflow for team collaboration.',
        desc: 'Each page shows live status, workspace context, and sharing readiness, not just static text.',
      },
      {
        eyebrow: 'From Draft To Publish',
        title: 'Move from first draft to share-ready output in one flow.',
        desc: 'Reorder blocks, set permissions, and finish with shareable links without leaving the editing context.',
      },
    ],
    flowCards: [
      {
        step: '01',
        title: 'Start with blocks',
        desc: 'Begin with an empty page and add blocks immediately to capture ideas fast.',
      },
      {
        step: '02',
        title: 'Shape the document',
        desc: 'Drag to reorder, split sections, and make the structure easier to scan.',
      },
      {
        step: '03',
        title: 'Sync with workspace',
        desc: 'Connect document progress to workspace context and keep team flow aligned.',
      },
      {
        step: '04',
        title: 'Share with control',
        desc: 'Set view/edit permissions and share safely with the right audience.',
      },
    ],
    featureCards: [
      {
        tone: 'paper',
        label: 'Editor Surface',
        title: 'A document-first interface that protects focus',
        desc: 'Only the tools you need appear, so content stays central and writing momentum continues.',
      },
      {
        tone: 'mist',
        label: 'Structured Blocks',
        title: 'Editing feel optimized for block movement and recomposition',
        desc: 'Even long documents stay manageable because context remains stable at the block level.',
      },
      {
        tone: 'ink',
        label: 'Collaboration',
        title: 'Team document operations with sharing and permission controls',
        desc: 'Designed for collaborative usage, not just personal notes, with safer team-wide document handling.',
      },
    ],
    architectureNotes: [
      'The browser talks only to Gateway APIs, so internal service routes stay hidden.',
      'After session validation, user and permission data connect naturally to the block editing flow.',
      'Landing copy is aligned to real editor behavior instead of inflated marketing language.',
    ],
    contactLinks: [
      { label: 'Open Editor', href: '/signin', external: false },
      { label: 'Terms', href: '/legal/terms', external: false },
      { label: 'Contact', href: 'mailto:jho951@naver.com', external: true },
    ],
    hero: {
      title: ['Bring a Craft-style', 'block-based document experience', 'to your workspace'],
      desc: 'The page is designed so writing, organizing, and sharing stay connected. From quick notes to long documents, users can understand the full block workflow at a glance.',
      primaryCta: 'Open Editor',
      secondaryCta: 'View Policies',
      windowTitle: 'block-editor / workspace',
      liveDocDesc:
        'Instead of becoming harder as documents grow, block-based structure keeps editing lighter and easier to maintain in context.',
      documentsDesc: 'Jump back into recent docs and drafts instantly',
      blocksDesc: 'Keep structure synced with real-time state',
      sharingDesc: 'Review team permission scope and share safely',
    },
    valueSection: {
      title: 'This is not just a writing tool. It is a document operations flow.',
      desc: 'Instead of emotional copy, we explain practical usage first so users quickly understand how to write and share from the first screen.',
    },
    flowSection: {
      title: 'One entry point from writing to sharing',
    },
    featureSection: {
      title: 'A refined craft.do-like tone translated into a block-centered workflow.',
      desc: 'We keep the calm UI direction while reflecting real product requirements for collaborative editing and permission handling.',
    },
    architectureSection: {
      title: 'Landing structure aligned with the current auth and gateway architecture',
      desc: 'This page is not only visual. It is an entry point designed to match the actual system constraints and user expectations.',
    },
    footerSection: {
      title: 'Finish with action, not just introduction.',
      desc: 'After sign-in, users can enter their workspace immediately and start block-based editing with clear CTA flow.',
    },
  },
};

const getHomeLandingData = (locale: Locale): HomeLandingData => HOME_LANDING_DATA[locale];

export { getHomeLandingData };
export type { HomeLandingData };
