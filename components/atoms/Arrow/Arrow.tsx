import { Icon } from '@/components/atoms/Icon';
import { ArrowProps } from '@/components/atoms/Arrow';

import styles from '@/components/atoms/Arrow/Arrow.module.css';

function Arrow({ size, rotate }: ArrowProps) {
  return (
    <span className={`${styles.container} ${rotate ? styles.rotate : ''}`}>
      <Icon name="arrow" size={size} />
    </span>
  );
}

export { Arrow };
