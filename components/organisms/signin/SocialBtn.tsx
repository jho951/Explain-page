'use client';
import { signIn } from 'next-auth/react';

import styles from '@/styles/features/SignIn.module.css';
import { ActionButton } from '@/components/atoms/ActionButton';
import { Icon } from '@/components/atoms/Icon';

function SocialBtn() {
  return (
    <div className={styles.socialButtons}>
      <ActionButton
        className={styles.oauth}
        leftIcon={<Icon name="google" size={20} />}
        variant="ghost"
        onClick={() => signIn('google')}
      >
        Google 계정으로 계속하기
      </ActionButton>
      {/* 추후 진행 */}
      {/* <ActionButton
              className={styles.oauth}
              leftIcon={<Icon name="apple" size={20} />}
              variant="ghost"
            >
              Apple로 계속하기
            </ActionButton> */}
      <ActionButton
        className={styles.oauth}
        leftIcon={<Icon name="kakao" size={20} />}
        variant="ghost"
        onClick={() => signIn('kakao')}
      >
        kakao 계정으로 계속하기
      </ActionButton>
    </div>
  );
}

export { SocialBtn };
