'use client';

import clsx from 'clsx';

import { IconButton } from '@/components/molecules/IconButton';
import { FloatingButtonProps } from '@/components/molecules/FloatingButton';
import styles from '@/components/molecules/FloatingButton/FloatingButton.module.css';

function FloatingButton({
  icon,
  iconSize,
  label,
  className,
  onClick,
  ...props
}: FloatingButtonProps) {
  return (
    <aside className={styles.floatingBtnContainer} onClick={onClick}>
      <IconButton
        className={clsx(styles.fab, className)}
        aria-label={label || 'Floating Action'}
        icon={icon}
        iconSize={iconSize}
        {...props}
      />
    </aside>
  );
}

export { FloatingButton };
