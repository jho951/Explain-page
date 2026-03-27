import { requestGatewayJson } from '@/libs/api-client';

interface AuthUser {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  roles: string[];
}

interface UserMeResponse {
  user?: (Partial<AuthUser> & { avatar_url?: string }) | null;
  id?: string;
  email?: string;
  name?: string;
  avatarUrl?: string;
  avatar_url?: string;
  roles?: string[];
}

const parseAuthUser = (payload: UserMeResponse): AuthUser => {
  const user = payload.user ?? payload;

  return {
    id: user.id ?? '',
    email: user.email ?? '',
    name: user.name ?? user.email ?? '',
    avatarUrl: user.avatarUrl ?? user.avatar_url ?? payload.avatarUrl ?? payload.avatar_url,
    roles: Array.isArray(user.roles) ? user.roles : [],
  };
};

const fetchCurrentUser = async (): Promise<AuthUser> => {
  const payload = await requestGatewayJson<UserMeResponse>('/users/me', {
    method: 'GET',
  });

  return parseAuthUser(payload);
};

export { fetchCurrentUser };
export type { AuthUser };
