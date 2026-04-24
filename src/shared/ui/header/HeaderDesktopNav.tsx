import { Button } from '@jho951/ui-components';
import styles from '@/shared/ui/header/Header.module.css';
import type { HeaderDesktopNavProps } from './Header.parts.types';

function HeaderDesktopNav({
  menu,
  index,
  desktopOpenIndex,
  onToggleMenu,
  onNavigate,
}: HeaderDesktopNavProps) {
  const items = menu.children ?? [];

  return (
    <div className={styles.navItem}>
      <Button
        type="button"
        variant="text"
        className={styles.navTrigger}
        aria-expanded={desktopOpenIndex === index}
        aria-controls={`header-menu-${menu.id}`}
        onClick={() => onToggleMenu(index)}
      >
        {menu.label}
      </Button>
      {desktopOpenIndex === index && items.length > 0 && (
        <div id={`header-menu-${menu.id}`} className={styles.menuLayer}>
          <div className={styles.menuPanel}>
            <p className={styles.menuEyebrow}>{menu.label}</p>
            <ul className={styles.menuPanelList}>
              {items.map(item => (
                <li key={item.id}>
                  <Button
                    type="button"
                    variant="text"
                    className={styles.menuPanelLink}
                    onClick={() => onNavigate(item.href, item.target)}
                  >
                    <span>{item.label}</span>
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export { HeaderDesktopNav };
