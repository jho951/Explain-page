'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@jho951/ui-components';

import { getGatewayLoginUrl } from '@/api/auth';
import { AUTH_DEFAULT_NEXT_PATH } from '@/constants/auth';
import { SignInTemplateProps } from '@/features/auth/components/SignInTemplate.types.ts';
import { useAppSelector } from '@/store/hooks';
import styles from '@/features/auth/components/SignIn.module.css';

function SignInTemplate({
  title,
  desc,
  dividerText = '또는',
  authConfigured = true,
  nextPath = AUTH_DEFAULT_NEXT_PATH,
}: SignInTemplateProps) {
  const router = useRouter();
  const { initialized, status } = useAppSelector(state => state.auth);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const isDisabled = isSubmitting;

  useEffect(() => {
    if (initialized && status === 'authenticated') {
      router.replace(nextPath);
    }
  }, [initialized, nextPath, router, status]);

  const handleSsoLogin = async () => {
    if (authConfigured === false) {
      setErrorMessage(
        'Gateway 로그인 환경변수가 설정되지 않았습니다. `NEXT_PUBLIC_GATEWAY_BASE_URL` 설정을 확인해 주세요.',
      );
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      window.location.assign(getGatewayLoginUrl());
    } catch {
      setIsSubmitting(false);
      setErrorMessage('Gateway 로그인 연결에 실패했습니다. 잠시 후 다시 시도해 주세요.');
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
                {isSubmitting ? 'Gateway로 이동 중...' : 'ExplainPage Gateway로 계속하기'}
              </Button>
            </div>

            <div className={styles.divider}>
              <span>{dividerText}</span>
            </div>

            <div className={styles.metaBlock}>
              <p className={styles.metaTitle}>ExplainPage Gateway 세션으로 로그인합니다</p>
              <p className={styles.metaText}>
                브라우저는 Gateway 도메인으로만 요청합니다. 로그인 후 이 프론트는 `ticket -&gt;
                /auth/exchange -&gt; /auth/me` 와 `/users/me` 로 사용자 상태를 확인합니다.
              </p>
            </div>

            {authConfigured === false ? (
              <p className={styles.setupMessage}>
                로그인 버튼을 쓰려면 서버 환경변수에 `NEXT_PUBLIC_GATEWAY_BASE_URL`이 필요합니다.
              </p>
            ) : null}

            {errorMessage ? <p className={styles.errorMessage}>{errorMessage}</p> : null}

            <p className={styles.disclaimer}>
              계속 진행하면 서비스 이용약관과 개인정보 처리방침에 동의한 것으로 간주됩니다.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default SignInTemplate;
