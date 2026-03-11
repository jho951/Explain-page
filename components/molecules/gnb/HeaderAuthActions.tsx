import { Button } from '@jho951/ui-components';

import { HeaderAuthActionsProps } from '@/components/molecules/gnb/gnb.types.ts';
import styles from './HeaderAuthActions.module.css';

function HeaderAuthActions({ mobile = false, onLogin, onStart }: HeaderAuthActionsProps) {
  return (
    <div className={mobile ? styles.mobileActions : styles.headerActions}>
      <Button type="button" variant="text" className={styles.loginAction} onClick={onLogin}>
        Login
      </Button>
      <Button type="button" variant="primary" className={styles.startAction} onClick={onStart}>
        Get Started
      </Button>
    </div>
  );
}

export { HeaderAuthActions };
