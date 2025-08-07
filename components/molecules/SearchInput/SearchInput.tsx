'use client';

import { forwardRef } from 'react';
import { Icon } from '@/components/atoms/Icon';
import { IconButton } from '@/components/molecules/IconButton';
import { BaseInput, BaseInputProps } from '@/components/atoms/BaseInput';

import styles from '@/components/molecules/SearchInput/SearchInput.module.css';

const SearchInput = forwardRef<HTMLInputElement, BaseInputProps>(({ ...props }, ref) => (
  <div className={styles.wrapper}>
    <span className={styles.icon}>
      <Icon name="search" size={25} />
    </span>
    <BaseInput ref={ref} type="search" placeholder="Search" className={styles.input} {...props} />
    <IconButton className={styles.micBtn} icon="mic" iconSize={24} />
  </div>
));

SearchInput.displayName = 'SearchInput';
export default SearchInput;
