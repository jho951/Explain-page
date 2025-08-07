import clsx from 'clsx';
import { SectionProps } from '@/components/atoms/BaseCard';

function createCardSection(name: string): React.FC<SectionProps> {
  const Section: React.FC<SectionProps> = ({ className, children }) => (
    <div className={clsx(name, className)}>{children}</div>
  );
  Section.displayName = `BaseCard.${name}`;
  return Section;
}

export { createCardSection };
