import { redirect } from 'next/navigation';

import { isGatewayConfigured } from '@/shared/api';
import SignInTemplate from '@/features/auth/components/SignInTemplate';
import type { SignInPageProps } from '@/app/(default)/(auth)/signin/page.types';
import { AUTH_DEFAULT_NEXT_PATH, DEFAULT_LOCALE, normalizeRedirectPath } from '@/shared/config';
import { buildStartFrontendSignInUrl, isExternalStartFrontend } from '@/shared/lib';

async function SignInPage({ searchParams }: SignInPageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const nextParam = resolvedSearchParams?.next;
  const nextPath = normalizeRedirectPath(Array.isArray(nextParam) ? nextParam[0] : nextParam);
  const authConfigured = isGatewayConfigured();
  const resolvedNextPath = nextPath || AUTH_DEFAULT_NEXT_PATH;

  if (isExternalStartFrontend()) redirect(buildStartFrontendSignInUrl(resolvedNextPath));

  return (
    <SignInTemplate
      title="SB에 오신 것을 환영합니다"
      desc="GitHub callback은 Gateway가 처리하고, 이 프론트는 `ticket -> /auth/exchange -> /auth/session` 확인 뒤 앱 진입 시 `/auth/me`를 조회합니다."
      dividerText="또는"
      locale={DEFAULT_LOCALE}
      authConfigured={authConfigured}
      nextPath={resolvedNextPath}
    />
  );
}

export default SignInPage;
