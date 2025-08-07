import { SectionTitle } from '@/components/molecules/SectionTitle/SectionTitle';

import { ActionButton } from '@/components/atoms/ActionButton';
import { Icon } from '@/components/atoms/Icon';
import styles from './HeroSection.module.css';

const features = [
  {
    icon: 'knowledge',
    label: '비 전공자도 이해하는 지식',
  },
  {
    icon: 'plane',
    label: '오프라인 지원',
  },
  {
    icon: 'gpt',
    label: 'AI 지원',
  },
  {
    icon: 'sync',
    label: '위키 형 블로그',
  },
] as const;

export default function HeroSection() {
  return (
    <section className={styles.hero}>
      <SectionTitle
        title={
          <h1>
            Every Day, a Step Forward
            <br />
            in Computer Science
          </h1>
        }
        desc={
          <ul className={styles.featureGrid}>
            {features.map(ele => (
              <li className={styles.featureItem} key={ele.label}>
                <Icon name={ele.icon} size={48} />
                <span className={styles.label}>{ele.label}</span>
              </li>
            ))}
          </ul>
        }
        align="center"
      />
      <div className={styles.startbtn}>
        <ActionButton className={styles.cubeBtn} variant="primary" size="lg">
          <span className={styles.cubeWrap}>
            <span className={`${styles.cubeFace} ${styles.front}`}>Started ?</span>
            <span className={`${styles.cubeFace} ${styles.top}`}>Started !</span>
          </span>
        </ActionButton>
      </div>
    </section>
  );
}
