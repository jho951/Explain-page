import { Link } from '@/components/atoms/Link';
import { Icon } from '@/components/atoms/Icon';
import { SocialCardProps } from '@/components/molecules/SocialCard';

import styles from '@/components/molecules/SocialCard/SocialCard.module.css';

function SocialCard({ icon, name, desc, action, url, meta }: SocialCardProps) {
  return (
    <div className={styles.card}>
      <Icon className={styles.icon} name={icon} size={50} />
      <div className={styles.cardInfo}>
        <span className={styles.meta}>{meta}</span>
        <div>
          <h3 className={styles.name}>{name}</h3>
          <p className={styles.desc}>{desc}</p>
        </div>

        <Link className={styles.navigate} href={url} external>
          {action} <Icon className={styles.slide} name="slide" size={20} />
        </Link>
      </div>
    </div>
  );
}

export { SocialCard };
