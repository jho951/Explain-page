import NextAuth from 'next-auth';
import { createAuthOptions } from '@/libs/auth';

const getHandler = () => NextAuth(createAuthOptions());

const GET = async (request: Request, context: unknown) => {
  return getHandler()(request, context);
};

const POST = async (request: Request, context: unknown) => {
  return getHandler()(request, context);
};

export { GET, POST };
