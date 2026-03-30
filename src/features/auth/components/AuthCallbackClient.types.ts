type CallbackStep = 'idle' | 'exchange' | 'auth-me' | 'done';

interface AuthCallbackClientProps {
  callbackError?: string;
  ticketParam?: string;
  nextParam?: string;
}

export type { CallbackStep, AuthCallbackClientProps };
