import { useScrollLock } from '@/hooks/useScroll';

import { Link } from '@/components/atoms/Link';
import { Arrow } from '@/components/atoms/Arrow';
import { MobileGnbProps } from '@/components/molecules/Gnb';
import { ActionButton } from '@/components/atoms/ActionButton';
import styles from '@/components/molecules/Gnb/MobileGnb.module.css';

function MobileGnb({ gnb, pathname, isOpen, openIndex, onToggle, onClick }: MobileGnbProps) {
  useScrollLock(isOpen);

  return (
    <aside
      className={`${styles.container} ${isOpen ? styles.open : styles.closed}`}
      aria-hidden={!isOpen}
    >
      {gnb.map((item, idx) => (
        <nav className={styles.section} key={item.id}>
          {item.children ? (
            <>
              <ActionButton
                className={styles.toggle}
                onClick={() => onToggle(idx)}
                aria-expanded={openIndex === idx}
                aria-controls={`mobile-submenu-${idx}`}
                aria-haspopup="true"
                variant="text"
                size="sm"
                rightIcon={<Arrow size={20} rotate={openIndex === idx} />}
              >
                {item.label}
              </ActionButton>

              <ul
                id={`mobile-submenu-${idx}`}
                className={`${styles.dropdown} ${openIndex === idx ? styles.open : styles.closed}`}
              >
                {item.children.map(sub => (
                  <li key={sub.href}>
                    <Link
                      className={styles.link}
                      href={sub.href}
                      role="menuitem"
                      aria-current={pathname === sub.href ? 'page' : undefined}
                      onClick={onClick}
                    >
                      {sub.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <Link
              className={styles.link}
              href={item.href ?? '#'}
              role="menuitem"
              aria-current={pathname === item.href ? 'page' : undefined}
              onClick={onClick}
            >
              {item.label}
            </Link>
          )}
        </nav>
      ))}

      <section className={styles.authBox}>
        <Link href="/signup" className={styles.startButton} onClick={onClick}>
          SB 체험하기
        </Link>

        <p className={styles.authText}>
          기존 회원이신가요?
          <Link href="/signin" className={styles.loginLink} onClick={onClick}>
            로그인하기
          </Link>
        </p>
      </section>
    </aside>
  );
}

export { MobileGnb };
