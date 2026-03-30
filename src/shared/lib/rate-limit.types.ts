type RateLimitEntry = {
  count: number;
  resetAt: number;
};

interface CheckRateLimitParams {
  key: string;
  limit: number;
  windowMs: number;
}

interface CheckRateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: number;
}

export type { RateLimitEntry, CheckRateLimitParams, CheckRateLimitResult };
