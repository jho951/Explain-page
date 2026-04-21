interface AuthUser {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  roles: string[];
  status?: string;
}

export type { AuthUser };
