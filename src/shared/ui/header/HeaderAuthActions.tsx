import { Button } from '@jho951/ui-components';

import type { HeaderAuthActionsProps } from './Header.parts.types';

import styles from '@/shared/ui/header/HeaderAuthActions.module.css';

function HeaderAuthActions({
  mobile = false,
  locale = 'en',
  isAuthenticated = false,
  isBusy = false,
  onLogin,
  onLogout,
}: HeaderAuthActionsProps) {
  const text =
    locale === 'en'
      ? { logout: 'Logout', login: 'Login' }
      : { logout: '로그아웃', login: '로그인' };

  return (
    <div className={mobile ? styles.mobileActions : styles.headerActions}>
      {isAuthenticated ? (
        <Button
          type="button"
          variant="text"
          className={styles.loginAction}
          onClick={onLogout}
          disabled={isBusy}
        >
          {text.logout}
        </Button>
      ) : (
        <Button
          type="button"
          variant="text"
          className={styles.loginAction}
          onClick={onLogin}
          disabled={isBusy}
        >
          {text.login}
        </Button>
      )}
    </div>
  );
}

export { HeaderAuthActions };
