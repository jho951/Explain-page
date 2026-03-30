'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@jho951/ui-components';

import { getGatewayLoginUrl } from '@/shared/api';
import { AUTH_DEFAULT_NEXT_PATH } from '@/shared/config';
import { SignInTemplateProps } from '@/features/auth/components/SignInTemplate.types.ts';
import { useAppSelector } from '@/shared/state/hooks';
import styles from '@/features/auth/components/SignIn.module.css';

function SignInTemplate({
  title,
  desc,
  dividerText = '또는',
  locale = 'ko',
  authConfigured = true,
  nextPath = AUTH_DEFAULT_NEXT_PATH,
}: SignInTemplateProps) {
  const router = useRouter();
  const { initialized, status } = useAppSelector(state => state.auth);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const isDisabled = isSubmitting;
  const text =
    locale === 'en'
      ? {
          missingGateway:
            'Gateway login environment variables are missing. Please check `NEXT_PUBLIC_GATEWAY_BASE_URL`.',
          loginFailed: 'Failed to connect to Gateway login. Please try again shortly.',
          moving: 'Redirecting to Gateway...',
          continue: 'Continue with ExplainPage Gateway',
          metaTitle: 'Sign in with the ExplainPage Gateway session',
          setupMessage:
            'To use this login button, set `NEXT_PUBLIC_GATEWAY_BASE_URL` in server environment variables.',
          disclaimer: 'By continuing, you agree to the Terms of Service and Privacy Policy.',
        }
      : {
          missingGateway:
            'Gateway 로그인 환경변수가 설정되지 않았습니다. `NEXT_PUBLIC_GATEWAY_BASE_URL` 설정을 확인해 주세요.',
          loginFailed: 'Gateway 로그인 연결에 실패했습니다. 잠시 후 다시 시도해 주세요.',
          moving: 'Gateway로 이동 중...',
          continue: 'ExplainPage Gateway로 계속하기',
          metaTitle: 'ExplainPage Gateway 세션으로 로그인합니다',
          setupMessage:
            '로그인 버튼을 쓰려면 서버 환경변수에 `NEXT_PUBLIC_GATEWAY_BASE_URL`이 필요합니다.',
          disclaimer:
            '계속 진행하면 서비스 이용약관과 개인정보 처리방침에 동의한 것으로 간주됩니다.',
        };

  useEffect(() => {
    if (!authConfigured) return;

    if (initialized && status === 'authenticated') {
      router.replace(nextPath);
      return;
    }

    if (initialized && status !== 'loading') {
      window.location.replace(getGatewayLoginUrl(nextPath));
    }
  }, [authConfigured, initialized, nextPath, router, status]);

  const handleSsoLogin = async () => {
    if (authConfigured === false) {
      setErrorMessage(text.missingGateway);
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      window.location.assign(getGatewayLoginUrl(nextPath));
    } catch {
      setIsSubmitting(false);
      setErrorMessage(text.loginFailed);
    }
  };

  return (
    <main className={styles.main}>
      <section className={styles.layout}>
        <div className={styles.contentShell}>
          <div className={styles.authCard}>
            <div className={styles.authHead}>
              <p className={styles.authEyebrow}>ACCOUNT ACCESS</p>
              <h2>{title}</h2>
              <p>{desc}</p>
            </div>

            <div className={styles.form}>
              <Button
                type="button"
                variant="primary"
                className={styles.githubButton}
                onClick={handleSsoLogin}
                disabled={isDisabled}
              >
                {isSubmitting ? text.moving : text.continue}
              </Button>
            </div>

            <div className={styles.divider}>
              <span>{dividerText}</span>
            </div>

            <div className={styles.metaBlock}>
              <p className={styles.metaTitle}>{text.metaTitle}</p>
            </div>

            {authConfigured === false ? (
              <p className={styles.setupMessage}>{text.setupMessage}</p>
            ) : null}

            {errorMessage ? <p className={styles.errorMessage}>{errorMessage}</p> : null}

            <p className={styles.disclaimer}>{text.disclaimer}</p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default SignInTemplate;
