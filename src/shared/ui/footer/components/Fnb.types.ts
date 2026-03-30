import { ABOUT, COMMUNITY, LEGAL, SUPPORT } from '@/shared/config';
import type { NavigationTreeLink } from '@/shared/types';

export const FNB: NavigationTreeLink[] = [ABOUT, COMMUNITY, LEGAL, SUPPORT];
export interface FnbProps {
  fnb: typeof FNB;
}
