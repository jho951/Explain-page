import { Button } from '@jho951/ui-components';

import { HeaderAuthActionsProps } from '@/shared/layout/Header/Header.parts.types';

import styles from '@/shared/layout/Header/HeaderAuthActions.module.css';

function HeaderAuthActions({
  mobile = false,
  isAuthenticated = false,
  isBusy = false,
  canLogout = false,
  onLogin,
  onStart,
  onLogout,
}: HeaderAuthActionsProps) {
  return (
    <div className={mobile ? styles.mobileActions : styles.headerActions}>
      {(!isAuthenticated || canLogout) && (
        <Button
          type="button"
          variant="text"
          className={styles.loginAction}
          onClick={isAuthenticated ? onLogout : onLogin}
          disabled={isBusy}
        >
          {isAuthenticated ? 'Logout' : 'Login'}
        </Button>
      )}
      <Button
        type="button"
        variant="primary"
        className={styles.startAction}
        onClick={onStart}
        disabled={isBusy}
      >
        {isAuthenticated ? 'Open App' : 'Get Started'}
      </Button>
    </div>
  );
}

export { HeaderAuthActions };
