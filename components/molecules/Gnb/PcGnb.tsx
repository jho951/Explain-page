import styles from '@/styles/header/PcNav.module.css';
import { Link } from '@/components/atoms/Link';
import { PcGnbProps } from '@/components/molecules/Gnb';
import { NOT_AUTH_LINK } from '@/data/navigation';

function PcGnb({ gnb, pathname, focusToggle }: PcGnbProps) {
  return (
    <nav className={styles.container} role="navigation" aria-label="주요 사이트 내비게이션">
      <ul role="menubar" className={`${styles.navList} focusable`}>
        {gnb.map((item, idx) => (
          <li key={item.id} role="none" className={styles.navItem}>
            <Link
              href={item.href}
              className={styles.link}
              role="menuitem"
              tabIndex={0}
              onFocus={() => focusToggle(idx)}
              aria-current={pathname === item.href ? 'page' : undefined}
              aria-expanded={pathname.startsWith(item.href)}
            >
              {item.label}
            </Link>

            {item.children && (
              <ul role="menu" className={styles.submenu}>
                {item.children.map(child => (
                  <li key={child.href} role="none">
                    <Link
                      href={child.href}
                      className={styles.subLink}
                      role="menuitem"
                      tabIndex={0}
                      aria-current={pathname === child.href ? 'page' : undefined}
                      aria-expanded={pathname.startsWith(child.href)}
                    >
                      {child.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>

      <ul role="menubar" className={styles.authList}>
        {NOT_AUTH_LINK.map((item, idx) => {
          const actualIdx = gnb.length + idx;
          return (
            <li key={item.id} role="none">
              <Link
                href={item.href}
                className={styles.link}
                role="menuitem"
                tabIndex={0}
                onFocus={() => focusToggle(actualIdx)}
                aria-current={pathname === item.href ? 'page' : undefined}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export { PcGnb };
