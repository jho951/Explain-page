import AuthCallbackClient from '@/features/auth/components/AuthCallbackClient';
import type { CallbackPageProps } from '@/app/auth/callback/page.types';

export const dynamic = 'force-dynamic';

function readSearchParam(value?: string | string[]) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function AuthCallbackPage({ searchParams }: CallbackPageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const callbackError = readSearchParam(resolvedSearchParams.error);
  const ticketParam = readSearchParam(resolvedSearchParams.ticket);
  const nextParam = readSearchParam(resolvedSearchParams.next);

  return (
    <AuthCallbackClient
      callbackError={callbackError}
      ticketParam={ticketParam}
      nextParam={nextParam}
    />
  );
}
