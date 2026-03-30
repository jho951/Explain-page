import { useEffect, useRef, useState } from 'react';
import { Button } from '@jho951/ui-components';

import { GNB } from '@/shared/config';
import { HeaderAuthActions } from './HeaderAuthActions';
import type { HeaderMobileMenuProps } from './Header.parts.types';
import { buildStartFrontendSignInUrl } from '@/shared/lib';

import styles from '@/shared/ui/header/Header.module.css';

function HeaderMobileMenu({
  panelRef,
  isExpanded,
  openCategoryId,
  onToggleCategory,
  onNavigate,
  isAuthenticated,
  isAuthBusy,
  onLogout,
}: HeaderMobileMenuProps) {
  const subMenuRefs = useRef<Record<string, HTMLUListElement | null>>({});
  const [subMenuHeights, setSubMenuHeights] = useState<Record<string, number>>({});

  useEffect(() => {
    const nextHeights: Record<string, number> = {};
    for (const menu of GNB) {
      const node = subMenuRefs.current[menu.id];
      nextHeights[menu.id] = node ? node.scrollHeight : 0;
    }
    setSubMenuHeights(nextHeights);
  }, [isExpanded, openCategoryId]);

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
                    ref={node => {
                      subMenuRefs.current[menu.id] = node;
                    }}
                    className={styles.subCategoryList}
                    style={{
                      maxHeight: isCategoryOpen ? `${subMenuHeights[menu.id] ?? 0}px` : '0px',
                    }}
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
          onLogin={() => onNavigate(buildStartFrontendSignInUrl())}
          onLogout={onLogout}
        />
      </div>
    </div>
  );
}

export { HeaderMobileMenu };
