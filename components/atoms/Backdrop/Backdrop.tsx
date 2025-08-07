import React from 'react';
import clsx from 'clsx';
import { BackdropProps } from '@/components/atoms/Backdrop/Backdrop.types';
import styles from '@/components/atoms/Backdrop/Backdrop.module.css';

function Backdrop({ visible = true, onClick, className }: BackdropProps) {
  if (!visible) return null;
  return <div className={clsx(styles.backdrop, className)} onClick={onClick} aria-hidden="true" />;
}

export { Backdrop };
