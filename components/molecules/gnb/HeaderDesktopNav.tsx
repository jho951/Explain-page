import { Button, Menu } from '@jho951/ui-components';

import { GNB } from '@/constants/navigation.ts';
import styles from '@/components/organisms/Header/Header.module.css';
import { HeaderDesktopNavProps } from '@/components/molecules/gnb/gnb.types.ts';

function HeaderDesktopNav({
  desktopOpenIndex,
  onToggleMenu,
  onCloseMenu,
  getMenuItems,
}: HeaderDesktopNavProps) {
  return (
    <nav className={styles.desktopNav} aria-label="global navigation">
      {GNB.map((menu, idx) => {
        const items = getMenuItems(idx);

        return (
          <div className={styles.navItem} key={menu.id}>
            <Button
              type="button"
              variant="text"
              className={styles.navTrigger}
              aria-expanded={desktopOpenIndex === idx}
              aria-controls={`header-menu-${menu.id}`}
              onClick={() => onToggleMenu(idx)}
            >
              {menu.label}
            </Button>
            {desktopOpenIndex === idx && items.length > 0 && (
              <div id={`header-menu-${menu.id}`} className={styles.menuLayer}>
                <Menu items={items} onRequestClose={onCloseMenu} />
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}

export { HeaderDesktopNav };
