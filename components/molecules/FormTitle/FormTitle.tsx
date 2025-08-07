import clsx from 'clsx';

import { Icon } from '@/components/atoms/Icon';
import { FormTitleProps } from '@/components/molecules/FormTitle';
import styles from '@/components/molecules/FormTitle/FormTitle.module.css';

function FormTitle({ title, desc, icon, size = 70, className }: FormTitleProps) {
  return (
    <section className={clsx(styles.sectionTitle, className)}>
      <Icon name={icon} size={size} />
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.desc}>{desc}</p>
    </section>
  );
}

export { FormTitle };
