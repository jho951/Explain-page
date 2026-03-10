import { SUPPORTED_THEMES } from '@/constants/theme';

export async function generateStaticParams() {
  return SUPPORTED_THEMES.filter(theme => theme !== 'system').map(theme => ({ theme }));
}
