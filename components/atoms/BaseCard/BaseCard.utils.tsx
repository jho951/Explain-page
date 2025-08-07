import clsx from 'clsx';
import type { SectionProps, CardSectionType } from '@/components/atoms/BaseCard';
import styles from '@/components/atoms/BaseCard/BaseCard.module.css';

function createCardSection(name: CardSectionType): React.FC<SectionProps> {
  const Section: React.FC<SectionProps> = ({ className, children, ...rest }) => (
    <div className={clsx(styles[name.toLowerCase()], className)} {...rest}>
      {children}
    </div>
  );
  Section.displayName = `BaseCard.${name}`;
  return Section;
}

export { createCardSection };
