import { redirect } from 'next/navigation';

import { isGatewayConfigured } from '@/api/auth';
import SignInTemplate from '@/features/auth/components/SignInTemplate';
import { AUTH_DEFAULT_NEXT_PATH, normalizeRedirectPath } from '@/constants/auth';
import { buildStartFrontendSignInUrl, isExternalStartFrontend } from '@/libs/auth-routing';

interface SignInPageProps {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

async function SignInPage({ searchParams }: SignInPageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const nextParam = resolvedSearchParams?.next;
  const nextPath = normalizeRedirectPath(Array.isArray(nextParam) ? nextParam[0] : nextParam);
  const authConfigured = isGatewayConfigured();
  const resolvedNextPath = nextPath || AUTH_DEFAULT_NEXT_PATH;

  if (isExternalStartFrontend()) {
    redirect(buildStartFrontendSignInUrl(resolvedNextPath));
  }

  return (
    <SignInTemplate
      title="SB에 오신 것을 환영합니다"
      desc="GitHub callback은 Gateway가 처리하고, 이 프론트는 `ticket -> /auth/exchange -> /auth/me` 확인만 담당합니다."
      dividerText="또는"
      authConfigured={authConfigured}
      nextPath={resolvedNextPath}
    />
  );
}

export default SignInPage;
