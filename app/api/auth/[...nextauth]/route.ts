import NextAuth from 'next-auth';
import KakaoProvider from 'next-auth/providers/kakao';
import GoogleProvider from 'next-auth/providers/google';

import { KAKAO_SECRET_KEY, GOOGLE_CLIENT_KEY, GOOGLE_SECRET_KEY } from '@/constants/security';

if (!KAKAO_SECRET_KEY) {
  throw new Error('KAKAO_CLIENT_ID 환경변수가 설정되어 있지 않습니다.');
}
if (!GOOGLE_CLIENT_KEY || !GOOGLE_SECRET_KEY) {
  throw new Error('GOOGLE_CLIENT_ID 또는 GOOGLE_SECRET_KEY 환경변수가 누락되었습니다.');
}

const handler = NextAuth({
  providers: [
    KakaoProvider({
      clientId: KAKAO_SECRET_KEY,
      clientSecret: '',
    }),
    GoogleProvider({
      clientId: GOOGLE_CLIENT_KEY,
      clientSecret: GOOGLE_SECRET_KEY,
    }),
  ],
});

export { handler as GET, handler as POST };
