import { useState } from 'react';

import { GNB } from '@/data/navigation';

import { Logo } from '@/components/molecules/Logo';

import { Backdrop } from '@/components/atoms/Backdrop';
import { PcGnb } from '@/components/molecules/Gnb/PcGnb';

import { MobileGnb } from '@/components/molecules/Gnb/MobileGnb';

import { HeaderProps } from '@/components/organisms/Header';

import { TITLE } from '@/constants/security';

import { useIsMobile } from '@/hooks/useDevice';

import styles from '@/components/organisms/Header/Header.module.css';
import { MenuButton } from '@/components/molecules/MenuButton';

function Header({ pathname }: HeaderProps) {
  const isMobile = useIsMobile();
  const [menuOpen, setMenuOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (idx: number) => setOpenIndex(prev => (prev === idx ? null : idx));
  const toggleMenu = () => setMenuOpen(prev => !prev);

  return (
    <>
      <header className={styles.headerContainer}>
        <section className={styles.wrapper}>
          <Logo pathname={pathname} onClick={() => setMenuOpen(false)} text={TITLE} />
          {!isMobile && (
            <PcGnb gnb={GNB} pathname={pathname} focusIndex={openIndex} focusToggle={toggle} />
          )}

          <MenuButton
            isToggled={menuOpen}
            iconSize={30}
            aria-label={menuOpen ? '메뉴 닫기' : '메뉴 열기'}
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
      <Backdrop onClick={toggleMenu} visible={isMobile && menuOpen} />
    </>
  );
}

export { Header };
