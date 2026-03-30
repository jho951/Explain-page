import { ReactNode } from 'react';
import { Locale } from '@/shared/types';

interface AuthTemplateProps {
  title: ReactNode;
  desc: ReactNode;
  dividerText: ReactNode;
}

interface SignInTemplateProps {
  title: string;
  desc: string;
  dividerText?: string;
  locale?: Locale;
  authConfigured?: boolean;
  nextPath?: string;
}

export type { AuthTemplateProps, SignInTemplateProps };
