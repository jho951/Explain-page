'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';

import styles from '@/components/molecules/FooterMeta/FooterMeta.module.css';
import { FooterProps } from '@/components/organisms/Footer';
import { Locale, LocaleOption } from '@/types/locale';
import { LANGUAGE_OPTIONS } from '@/constants/locale';
import { COPY } from '@/constants/security';
import { Spinner } from '@/components/atoms/Spinner';
import { Icon } from '@/components/atoms/Icon';
import { DropdownSelect } from '@/components/molecules/DropdownSelect';
import { Link } from '@/components/atoms/Link';
import { SNS_LINK } from '@/data/navigation';

function FooterMeta({ pathname }: FooterProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const localeList: Locale[] = ['ko', 'en'];
  const segments = pathname.split('/');
  const maybeLang = segments[1];
  const currentLang: Locale = localeList.includes(maybeLang as Locale)
    ? (maybeLang as Locale)
    : 'ko';

  const handleLocaleChange = (nextLang: Locale) => {
    if (nextLang === currentLang) return;

    const [, maybeLang, ...rest] = pathname.split('/');
    const isCurrentLangDefault = !localeList.includes(maybeLang as Locale);

    const pathWithoutLocale = isCurrentLangDefault ? pathname : `/${rest.join('/')}`;
    const nextPath = nextLang === 'ko' ? pathWithoutLocale : `/${nextLang}${pathWithoutLocale}`;

    startTransition(() => {
      router.push(nextPath);
    });
  };

  const selectedLanguage = LANGUAGE_OPTIONS.find(l => l.value === currentLang)!;

  return (
    <div className={styles.bottom}>
      <p className={styles.copy}>{COPY}</p>

      <div className={styles.languageAndIcons}>
        {isPending ? (
          <Spinner />
        ) : (
          <div className={styles.selectWrap}>
            <Icon className={styles.globe} name="globe" size={18} />
            <DropdownSelect<LocaleOption>
              variant="text"
              options={LANGUAGE_OPTIONS}
              value={currentLang}
              onChange={handleLocaleChange}
              renderOptionLabel={opt => <span className={styles.languageText}>{opt.label}</span>}
              placeholder={<span className={styles.languageText}>{selectedLanguage.label}</span>}
            />
          </div>
        )}

        <div className={styles.icons}>
          {SNS_LINK.map(({ id, href, icon }) => (
            <Link
              className={styles.iconLink}
              key={id}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={id}
            >
              <Icon name={icon} size={18} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export { FooterMeta };
