import { Image } from '@/shared/ui/Image';
import styles from './PromoTiles.module.css';

const tiles = [
  {
    img: '/images/developer.png',
    tone: 'paperBlue',
    title: '아이디어를 곧바로 초안으로',
    desc: '짧은 메모나 키워드만 있어도 소개글과 설명문 초안을 빠르게 시작할 수 있습니다.',
  },
  {
    img: '/images/algorithm.png',
    tone: 'paperDark',
    title: '문장의 흐름을 자연스럽게 편집',
    desc: '길고 복잡한 설명도 핵심 중심으로 다시 정리해 읽기 쉬운 문장으로 바꿉니다.',
  },
  {
    img: '/images/sample.png',
    tone: 'paperSand',
    title: '공유 가능한 결과물까지 마무리',
    desc: '초안 상태에서 멈추지 않고, 팀과 사용자에게 바로 전달할 수 있는 문서 형태로 정리합니다.',
  },
];

export default function PromoTiles() {
  return (
    <section className={styles.section}>
      <div className={styles.sectionInner}>
        <div className={styles.sectionHead}>
          <p className={styles.eyebrow}>CORE BENEFITS</p>
          <h2 className={styles.title}>에디터 서비스를 한눈에 이해할 수 있는 핵심 장점</h2>
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
                <span className={styles.badge}>Editor Benefit</span>
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
