import { redirect } from 'next/navigation';

import { isGatewayConfigured } from '@/shared/api';
import SignInTemplate from '@/features/auth/components/SignInTemplate';
import { AUTH_DEFAULT_NEXT_PATH, normalizeRedirectPath } from '@/shared/config';
import { buildStartFrontendSignInUrl, isExternalStartFrontend } from '@/shared/lib';
import type { Locale } from '@/shared/types';
import {
  resolveSupportedLocale,
  type LocalizedRouteProps,
  type SearchRouteProps,
} from '@/app/route-factories';

const copyByLocale: Record<Locale, { title: string; desc: string; dividerText: string }> = {
  ko: {
    title: 'SB에 오신 것을 환영합니다',
    desc: 'GitHub callback은 Gateway가 처리하고, 이 프론트는 `ticket -> /auth/exchange -> /auth/session` 확인 뒤 앱 진입 시 `/auth/me`를 조회합니다.',
    dividerText: '또는',
  },
  en: {
    title: 'Welcome to SB',
    desc: 'GitHub callback is handled by Gateway, and this frontend validates `ticket -> /auth/exchange -> /auth/session` before loading `/auth/me` during app bootstrap.',
    dividerText: 'or',
  },
};

type LocalizedSignInRouteProps = LocalizedRouteProps & SearchRouteProps;

async function SignInPage({ params, searchParams }: LocalizedSignInRouteProps) {
  const lang = await resolveSupportedLocale(params);

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
