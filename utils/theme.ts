import { Theme } from '@/types/theme';

/**
 * 현재 사용자의 로컬 시간을 기준으로 야간 시간인지 판별합니다.
 *
 * @returns {boolean} 현재 시간이 밤(오후 7시 이후 또는 오전 7시 이전)이면 true를 반환합니다.
 */
function isNightTime(): boolean {
  const hour = new Date().getHours();
  return hour >= 19 || hour < 7;
}

/**
 * 초기 테마를 결정합니다.
 *
 * 다음 순서에 따라 테마를 결정합니다:
 * 1. localStorage에 저장된 테마(`'light'` 또는 `'dark'`)가 있으면 해당 값을 사용 (수동 설정으로 간주)
 * 2. 시스템의 다크 모드 선호 여부(media query)
 * 3. 야간 시간인지 여부 (`isNightTime()` 활용)
 * 위 조건이 모두 해당되지 않으면 기본값 `'light'`를 반환합니다.
 *
 * @returns {{
 *   theme: Theme;       // 적용할 테마 값 ('light' | 'dark')
 *   isManual: boolean;  // 수동 설정 여부
 * }}
 */
function resolveInitialTheme(): { theme: Theme; isManual: boolean } {
  const saved = localStorage.getItem('theme') as Theme | null;
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (saved === 'light' || saved === 'dark') {
    return { theme: saved, isManual: true };
  } else if (prefersDark || isNightTime()) {
    return { theme: 'dark', isManual: false };
  }
  return { theme: 'light', isManual: false };
}

export { isNightTime, resolveInitialTheme };
