import { forwardRef } from 'react';
import clsx from 'clsx';

import { Icon } from '@/components/atoms/Icon';
import { BaseButton } from '@/components/atoms/BaseButton';
import { MenuButtonProps } from '@/components/molecules/MenuButton';

import styles from '@/components/molecules/MenuButton/MenuButton.module.css';

const MenuButton = forwardRef<HTMLButtonElement, MenuButtonProps>(
  ({ isToggled, iconSize, className, ...rest }, ref) => {
    return (
      <BaseButton
        ref={ref}
        className={clsx(styles.MenuBtnContainer, className)}
        variant="text"
        {...rest}
      >
        <span className={styles.iconSwap}>
          <span
            className={clsx(styles.iconWrap, { [styles.visible]: !isToggled })}
            aria-hidden={isToggled}
          >
            <Icon name="hamburger" size={iconSize} />
          </span>
          <span
            className={clsx(styles.iconWrap, { [styles.visible]: isToggled })}
            aria-hidden={!isToggled}
          >
            <Icon name="close" size={iconSize - 4} />
          </span>
        </span>
      </BaseButton>
    );
  },
);
MenuButton.displayName = 'MenuButton';

export { MenuButton };
