'use client';

import { useEffect, useRef, useState } from 'react';

import { ActionButton } from '@/components/atoms/ActionButton';
import { BaseSelectOption } from '@/components/atoms/BaseSelect';
import { DropdownSelectProps } from '@/components/molecules/DropdownSelect/DropdownSelect.types';
import styles from '@/components/molecules/DropdownSelect/DropdownSelect.module.css';

function DropdownSelect<T extends BaseSelectOption>({
  options,
  value,
  onChange,
  className = '',
  placeholder = 'Select...',
  variant = 'text',
  renderOptionLabel,
}: DropdownSelectProps<T>) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find(opt => opt.value === value);

  return (
    <div className={`${styles.wrapper} ${className} `} ref={containerRef}>
      <ActionButton
        type="button"
        className={`${styles.trigger} ${variant === 'text' ? styles.text : ''}`}
        onClick={() => setOpen(prev => !prev)}
        aria-haspopup="listbox"
        aria-expanded={open}
        variant={variant}
      >
        {selectedOption
          ? (renderOptionLabel?.(selectedOption) ?? selectedOption.label)
          : placeholder}
      </ActionButton>

      <ul
        className={`${styles.dropdown} ${open ? styles.open : ''}`}
        role="listbox"
        aria-hidden={!open}
      >
        {options.map(opt => {
          const isSelected = opt.value === value;
          return (
            <li
              key={`${opt.value}-${opt.label}`}
              className={`${styles.option} ${isSelected ? styles.selected : ''}`}
              role="option"
              aria-selected={isSelected}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
            >
              {renderOptionLabel?.(opt) ?? opt.label}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export { DropdownSelect };
