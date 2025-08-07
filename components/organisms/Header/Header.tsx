import { useState } from 'react';

import { GNB } from '@/data/navigation';

import { Logo } from '@/components/molecules/Logo';

import { Backdrop } from '@/components/atoms/Backdrop';
import { PcGnb } from '@/components/molecules/Gnb/PcGnb';
import { IconButton } from '@/components/molecules/IconButton';
import { MobileGnb } from '@/components/molecules/Gnb/MobileGnb';

import { HeaderProps } from '@/components/organisms/Header';

import { TITLE } from '@/constants/security';

import { useIsMobile } from '@/hooks/useDevice';
import { useScrollLock } from '@/hooks/useScroll';

import styles from '@/components/organisms/Header/Header.module.css';

function Header({ pathname }: HeaderProps) {
  const isMobile = useIsMobile();
  const [menuOpen, setMenuOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleMenu = () => setMenuOpen(prev => !prev);
  const toggle = (idx: number) => setOpenIndex(prev => (prev === idx ? null : idx));

  useScrollLock(menuOpen);

  return (
    <>
      <Backdrop onClick={toggleMenu} visible={menuOpen} />
      <header className={styles.headerContainer}>
        <section className={styles.wrapper}>
          <Logo pathname={pathname} onClick={() => setMenuOpen(false)} text={TITLE} />
          {!isMobile && (
            <PcGnb gnb={GNB} pathname={pathname} focusIndex={openIndex} focusToggle={toggle} />
          )}

          <IconButton
            icon={menuOpen ? 'hamburger' : 'close'}
            iconSize={15}
            type="button"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={toggleMenu}
          />
        </section>
        {isMobile && (
          <MobileGnb
            gnb={GNB}
            pathname={pathname}
            isOpen={menuOpen}
            openIndex={openIndex}
            onToggle={toggle}
            onClick={toggleMenu}
          />
        )}
      </header>
    </>
  );
}

export { Header };
