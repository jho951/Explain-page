import { notFound, redirect } from 'next/navigation';

import { isGatewayConfigured } from '@/shared/api';
import SignInTemplate from '@/features/auth/components/SignInTemplate';
import { AUTH_DEFAULT_NEXT_PATH, SUPPORTED_LOCALES, normalizeRedirectPath } from '@/shared/config';
import { buildStartFrontendSignInUrl, isExternalStartFrontend } from '@/shared/lib';
import type { Locale } from '@/shared/types';
import type { LangSignInPageProps } from '@/app/[lang]/(auth)/signin/page.types';

const copyByLocale: Record<Locale, { title: string; desc: string; dividerText: string }> = {
  ko: {
    title: 'SB에 오신 것을 환영합니다',
    desc: 'GitHub callback은 Gateway가 처리하고, 이 프론트는 `ticket -> /auth/exchange -> /auth/me` 확인만 담당합니다.',
    dividerText: '또는',
  },
  en: {
    title: 'Welcome to SB',
    desc: 'GitHub callback is handled by Gateway, and this frontend only validates `ticket -> /auth/exchange -> /auth/me`.',
    dividerText: 'or',
  },
};

async function SignInPage({ params, searchParams }: LangSignInPageProps) {
  const { lang } = await params;
  if (!SUPPORTED_LOCALES.includes(lang)) notFound();

  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const nextParam = resolvedSearchParams?.next;
  const nextPath = normalizeRedirectPath(Array.isArray(nextParam) ? nextParam[0] : nextParam);
  const authConfigured = isGatewayConfigured();
  const resolvedNextPath = nextPath || AUTH_DEFAULT_NEXT_PATH;

  if (isExternalStartFrontend()) redirect(buildStartFrontendSignInUrl(resolvedNextPath));

  const copy = copyByLocale[lang];

  return (
    <SignInTemplate
      title={copy.title}
      desc={copy.desc}
      dividerText={copy.dividerText}
      locale={lang}
      authConfigured={authConfigured}
      nextPath={resolvedNextPath}
    />
  );
}

export default SignInPage;
