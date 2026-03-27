import { Button } from '@jho951/ui-components';

import { AUTH_DEFAULT_NEXT_PATH } from '@/constants/auth';
import { GNB } from '@/constants/navigation.ts';
import { HeaderAuthActions } from '@/shared/layout/Header/HeaderAuthActions';
import { HeaderMobileMenuProps } from '@/shared/layout/Header/Header.parts.types';
import { buildStartFrontendSignInUrl } from '@/libs/auth-routing';

import styles from '@/shared/layout/Header/Header.module.css';

function HeaderMobileMenu({
  panelRef,
  isExpanded,
  openCategoryId,
  onToggleCategory,
  onNavigate,
  isAuthenticated,
  isAuthBusy,
  canLogout,
  onLogout,
}: HeaderMobileMenuProps) {
  return (
    <div
      ref={panelRef}
      className={styles.headerExpandContent}
      id="ttHeaderPanel"
      aria-hidden={!isExpanded}
    >
      <div className={styles.menuList}>
        <ul className={styles.categoryList}>
          {GNB.map(menu => {
            const hasChildren = Boolean(menu.children?.length);
            const isCategoryOpen = openCategoryId === menu.id;

            return (
              <li key={menu.id} className={hasChildren ? styles.hasChildren : undefined}>
                <Button
                  type="button"
                  variant="text"
                  className={styles.linkItem}
                  aria-expanded={hasChildren ? isCategoryOpen : undefined}
                  onClick={() => {
                    if (!hasChildren) {
                      onNavigate(menu.href, menu.target);
                      return;
                    }
                    onToggleCategory(menu.id);
                  }}
                >
                  <span>{menu.label}</span>
                </Button>

                {hasChildren && (
                  <ul
                    className={`${styles.subCategoryList} ${isCategoryOpen ? styles.subCategoryListOpen : ''}`}
                  >
                    {menu.children?.map(child => (
                      <li key={child.id}>
                        <Button
                          type="button"
                          variant="text"
                          className={styles.linkSubItem}
                          onClick={() => onNavigate(child.href, child.target)}
                        >
                          {child.label}
                        </Button>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      <div className={styles.menuFooter}>
        <HeaderAuthActions
          mobile
          isAuthenticated={isAuthenticated}
          isBusy={isAuthBusy}
          canLogout={canLogout}
          onLogin={() => onNavigate(buildStartFrontendSignInUrl())}
          onStart={() =>
            onNavigate(
              isAuthenticated
                ? AUTH_DEFAULT_NEXT_PATH
                : buildStartFrontendSignInUrl(AUTH_DEFAULT_NEXT_PATH),
            )
          }
          onLogout={onLogout}
        />
      </div>
    </div>
  );
}

export { HeaderMobileMenu };
