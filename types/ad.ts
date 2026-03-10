// types/adsense.ts

/**
 * Google AdSense 광고 설정 객체 타입
 */
/**
 * AdsbygoogleConfig type 설명을 여기에 작성하세요.
 */
type AdsbygoogleConfig = {
  google_ad_client: string;
  google_ad_slot?: string;
  enable_page_level_ads?: boolean;
  google_ad_width?: number | string;
  google_ad_height?: number | string;
  google_ad_format?: string;
  responsive?: string;

  /**
   * 기타 동적 속성 허용 (Google Ads 커스텀 파라미터)
   */
  [key: string]: string | number | boolean | undefined;
};

/**
 * Window.adsbygoogle 전역 배열 타입
 */
/**
 * AdsByGoogle type 설명을 여기에 작성하세요.
 */
type AdsByGoogle = AdsbygoogleConfig[];

/**
 * 광고 삽입용 slot props
 */
/**
 * AdsenseSlotOptions type 설명을 여기에 작성하세요.
 */
type AdsenseSlotOptions = {
  slotId?: string;
  responsive?: boolean;
  format?: string;
  style?: React.CSSProperties;
  onError?: () => void;
  fallback?: React.ReactNode;
};

/**
 * 광고 배너 컴포넌트 Props
 */
/**
 * AdBannerProps interface 설명을 여기에 작성하세요.
 */
interface AdBannerProps {
  slotId?: string;
  height?: string | number;
  width?: string | number;
  className?: string;
}

export type { AdsbygoogleConfig, AdsByGoogle, AdsenseSlotOptions, AdBannerProps };
