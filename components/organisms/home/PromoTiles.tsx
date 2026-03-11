import { Image } from '@/components/atoms/Image';
import styles from './PromoTiles.module.css';

const tiles = [
  {
    img: '/images/developer.png',
    tone: 'paperBlue',
    title: 'Design systems that last',
    desc: '문제 상황이 커졌을 때도 흔들리지 않도록, 구조와 기준을 먼저 세웁니다.',
  },
  {
    img: '/images/algorithm.png',
    tone: 'paperDark',
    title: 'Turn complexity into flow',
    desc: '관찰 포인트와 데이터 경계를 명확하게 만들어 디버깅 비용을 줄입니다.',
  },
  {
    img: '/images/sample.png',
    tone: 'paperSand',
    title: 'Document the why',
    desc: '코드만 남기지 않고 의사결정의 이유까지 정리해 팀이 빠르게 움직이게 합니다.',
  },
];

export default function PromoTiles() {
  return (
    <section className={styles.section}>
      <div className={styles.sectionInner}>
        <div className={styles.sectionHead}>
          <p className={styles.eyebrow}>PROMO TILES</p>
          <h2 className={styles.title}>핵심 작업 방식을 짧은 카드로 정리했습니다.</h2>
        </div>
        <div className={styles.cardGrid}>
          {tiles.map(tile => (
            <article className={`${styles.card} ${styles[tile.tone]}`} key={tile.title}>
              <Image
                src={tile.img}
                className={styles.cardImg}
                alt={tile.desc}
                aspectRatio="16/10"
              />
              <div className={styles.cardBody}>
                <span className={styles.badge}>Work Style</span>
                <h3>{tile.title}</h3>
                <p>{tile.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
