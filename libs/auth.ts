import type { NextAuthOptions } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';

import { GITHUB_CLIENT_KEY, GITHUB_SECRET_KEY, NEXTAUTH_SECRET_KEY } from '@/constants/security';

const createAuthOptions = (): NextAuthOptions => {
  if (!GITHUB_CLIENT_KEY || !GITHUB_SECRET_KEY) {
    throw new Error('GITHUB_CLIENT_ID 또는 GITHUB_CLIENT_SECRET 환경변수가 누락되었습니다.');
  }

  if (!NEXTAUTH_SECRET_KEY) {
    throw new Error('NEXTAUTH_SECRET 환경변수가 누락되었습니다.');
  }

  return {
    secret: NEXTAUTH_SECRET_KEY,
    providers: [
      GitHubProvider({
        clientId: GITHUB_CLIENT_KEY,
        clientSecret: GITHUB_SECRET_KEY,
      }),
    ],
    pages: {
      signIn: '/signin',
    },
    session: {
      strategy: 'jwt',
    },
    callbacks: {
      async redirect({ url, baseUrl }) {
        if (url.startsWith('/')) {
          return `${baseUrl}${url}`;
        }

        if (url.startsWith(baseUrl)) {
          return url;
        }

        return baseUrl;
      },
    },
  };
};

export { createAuthOptions };
