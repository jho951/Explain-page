import { Locale } from '@/shared/types';

import WorkspaceSidebar from './WorkspaceSidebar';
import { getHomeLandingData } from '../data/homeLanding.data';
import { ActiveLink } from '@/shared/ui';
import styles from './PortfolioLanding.module.css';

interface SectionProps {
  locale: Locale;
}

function HeroSection({ locale }: SectionProps) {
  const data = getHomeLandingData(locale);

  return (
    <section className={styles.hero}>
      <div className={styles.heroCopy}>
        <p className={styles.eyebrow}>BLOCK EDITOR SERVICE</p>
        <h1 className={styles.heroTitle}>
          {data.hero.title[0]}
          <br />
          {data.hero.title[1]}
          <br />
          {data.hero.title[2]}
        </h1>
        <p className={styles.heroDesc}>{data.hero.desc}</p>
        <div className={styles.heroActions}>
          <ActiveLink href="/signin" className={styles.primaryAction}>
            {data.hero.primaryCta}
          </ActiveLink>
          <ActiveLink href="/legal/terms" className={styles.secondaryAction}>
            {data.hero.secondaryCta}
          </ActiveLink>
        </div>
        <div className={styles.signalRail}>
          {data.signalItems.map(item => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </div>

      <div className={styles.desktopFrame}>
        <div className={styles.windowBar}>
          <span />
          <span />
          <span />
          <p>{data.hero.windowTitle}</p>
        </div>
        <div className={styles.workspaceShell}>
          <WorkspaceSidebar />

          <div className={styles.editorSurface}>
            <div className={styles.documentCard}>
              <p className={styles.cardLabel}>Live Document</p>
              <h2>Write in blocks, shape in context, publish as a team.</h2>
              <p>{data.hero.liveDocDesc}</p>
            </div>

            <div className={styles.miniGrid}>
              <article className={styles.miniCard}>
                <span>Documents</span>
                <strong>84 active</strong>
                <p>{data.hero.documentsDesc}</p>
              </article>
              <article className={styles.miniCard}>
                <span>Blocks</span>
                <strong>1,240 synced</strong>
                <p>{data.hero.blocksDesc}</p>
              </article>
              <article className={styles.miniCard}>
                <span>Sharing</span>
                <strong>Controlled</strong>
                <p>{data.hero.sharingDesc}</p>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ValueSection({ locale }: SectionProps) {
  const data = getHomeLandingData(locale);

  return (
    <section className={styles.valueSection}>
      <div className={styles.sectionIntro}>
        <p className={styles.eyebrow}>WHY BLOCK EDITOR</p>
        <h2>{data.valueSection.title}</h2>
        <p>{data.valueSection.desc}</p>
      </div>
      <div className={styles.valueGrid}>
        {data.valueCards.map(card => (
          <article key={card.title} className={styles.valueCard}>
            <p className={styles.valueEyebrow}>{card.eyebrow}</p>
            <h3>{card.title}</h3>
            <p>{card.desc}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function FlowSection({ locale }: SectionProps) {
  const data = getHomeLandingData(locale);

  return (
    <section className={styles.flowSection}>
      <div className={styles.sectionIntro}>
        <p className={styles.eyebrow}>EDITOR FLOW</p>
        <h2>{data.flowSection.title}</h2>
      </div>
      <div className={styles.flowGrid}>
        {data.flowCards.map(card => (
          <article key={card.step} className={styles.flowCard}>
            <p>{card.step}</p>
            <h3>{card.title}</h3>
            <span>{card.desc}</span>
          </article>
        ))}
      </div>
    </section>
  );
}

function FeatureSection({ locale }: SectionProps) {
  const data = getHomeLandingData(locale);

  return (
    <section className={styles.featureSection}>
      <div className={styles.sectionIntro}>
        <p className={styles.eyebrow}>EDITOR SURFACE</p>
        <h2>{data.featureSection.title}</h2>
        <p>{data.featureSection.desc}</p>
      </div>
      <div className={styles.featureGrid}>
        {data.featureCards.map(card => (
          <article key={card.title} className={`${styles.featureCard} ${styles[card.tone]}`}>
            <span>{card.label}</span>
            <h3>{card.title}</h3>
            <p>{card.desc}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function ArchitectureSection({ locale }: SectionProps) {
  const data = getHomeLandingData(locale);

  return (
    <section className={styles.architectureSection}>
      <div className={styles.architectureCard}>
        <div className={styles.architectureCopy}>
          <p className={styles.eyebrow}>SYSTEM FIT</p>
          <h2>{data.architectureSection.title}</h2>
          <p>{data.architectureSection.desc}</p>
        </div>
        <ul className={styles.noteList}>
          {data.architectureNotes.map(note => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function FooterCtaSection({ locale }: SectionProps) {
  const data = getHomeLandingData(locale);

  return (
    <section className={styles.footerSection}>
      <div className={styles.footerCard}>
        <div>
          <p className={styles.eyebrow}>OPEN YOUR WORKSPACE</p>
          <h2>{data.footerSection.title}</h2>
          <p className={styles.footerDesc}>{data.footerSection.desc}</p>
        </div>
        <div className={styles.footerActions}>
          {data.contactLinks.map(item => (
            <ActiveLink
              key={item.label}
              href={item.href}
              external={item.external}
              className={styles.footerAction}
            >
              {item.label}
            </ActiveLink>
          ))}
        </div>
      </div>
    </section>
  );
}

export {
  ArchitectureSection,
  FeatureSection,
  FlowSection,
  FooterCtaSection,
  HeroSection,
  ValueSection,
};
