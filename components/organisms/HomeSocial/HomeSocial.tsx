import { SOCIAL_LIST } from '@/data/navigation';

import { SocialCard } from '@/components/molecules/SocialCard/SocialCard';
import { SectionTitle } from '@/components/molecules/SectionTitle/SectionTitle';

import styles from '@/components/organisms/HomeSocial/HomeSocial.module.css';

function HomeSocial() {
  return (
    <section className={styles.section}>
      <SectionTitle
        title={<h2>Stay In The Loop</h2>}
        desc={
          <p className={styles.desc}>
            Join the community and learn how other people get the most out of Craft.
          </p>
        }
      />
      <div className={styles.grid}>
        {SOCIAL_LIST.map(item => (
          <SocialCard key={item.name} {...item} />
        ))}
      </div>
    </section>
  );
}

export { HomeSocial };
