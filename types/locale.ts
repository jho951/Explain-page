/** 지원되는 언어 코드 */
type Locale = 'en' | 'ko';

/** 다국어 메시지 구조 */
interface LocaleMessages {
  header: {
    home: string;
    blog: string;
  };
  home: {
    title: string;
    description: string;
  };
  navigation: {
    // GNB
    company: string;
    programming: string;
    posting: string;
    community: string;
    download: string;
    legal: string;

    // COMPANY
    about: string;
    brand: string;
    careers: string;

    // PROGRAMMING
    programmingLang: string;
    algorithm: string;
    dataStructure: string;
    os: string;
    network: string;
    security: string;
    dataBase: string;

    // POSTING
    newPosting: string;
    writing: string;
    tag: string;
    popular: string;

    // COMMUNITY
    contact: string;
    faq: string;
    linkedIn: string;
    slack: string;
    discord: string;

    // DOWNLOAD
    iphone: string;
    ipad: string;
    android: string;
    mac: string;
    window: string;

    // LEGAL
    privacy: string;
    terms: string;
    secure: string;
    esg: string;
    responsible: string;

    // AUTH
    myPage: string;
    logOut: string;
    signIn: string;
    signUp: string;
  };
}

/**
 * 언어 선택 항목을 표현하는 인터페이스
 */
interface LocaleOption {
  /** 고유 ID (예: dropdown에서 key로 사용) */
  id: number;
  /** 언어 코드 (ex. 'en', 'ko') */
  value: Locale;
  /** 사용자에게 보여질 언어명 라벨 */
  label: string;
}

export type { Locale, LocaleMessages, LocaleOption };
