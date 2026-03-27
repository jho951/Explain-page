import AuthCallbackClient from '@/features/auth/components/AuthCallbackClient';

export const dynamic = 'force-dynamic';

interface CallbackPageProps {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

function readSearchParam(value?: string | string[]) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function AuthCallbackPage({ searchParams }: CallbackPageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;

  return (
    <AuthCallbackClient
      callbackError={readSearchParam(resolvedSearchParams?.error)}
      ticketParam={readSearchParam(resolvedSearchParams?.ticket)}
      nextParam={readSearchParam(resolvedSearchParams?.next)}
    />
  );
}
