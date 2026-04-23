interface AuthMeResponse {
  id?: string;
  email?: string;
  name?: string;
  avatarUrl?: string | null;
  roles?: string[];
  status?: string;
}

interface AuthSessionValidationResponse {
  authenticated: boolean;
  userId: string;
  status: string;
  sessionId: string;
  role: string;
}

export type { AuthMeResponse, AuthSessionValidationResponse };
