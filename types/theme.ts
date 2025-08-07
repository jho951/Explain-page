import { SUPPORTED_THEMES } from '@/constants/theme';

/**
 * Theme 종류
 */
type Theme = (typeof SUPPORTED_THEMES)[number];

export type { Theme };
