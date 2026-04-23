type CallbackStep = 'idle' | 'exchange' | 'auth-session' | 'done';

interface AuthCallbackClientProps {
  callbackError?: string;
  ticketParam?: string;
  nextParam?: string;
}

export type { CallbackStep, AuthCallbackClientProps };
