import { Theme } from '@/types/theme';

const DEFAULT_THEME: Theme = 'light';
const SUPPORTED_THEMES = ['light', 'dark', 'system'] as const;

export { DEFAULT_THEME, SUPPORTED_THEMES };
