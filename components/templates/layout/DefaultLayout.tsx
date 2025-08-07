import { ClientLayoutWrapper } from '@/components/organisms/wrapper/ClientLayoutWrapper';

import { getMessages, SetHtmlLang } from '@/utils/locale';

import { ThemeProvider } from '@/contexts/ThemeContext';

import { TranslationsProvider } from '@/contexts/TranslationContext';
import { LayoutProps } from '@/types/layout';

export default async function DefaultLayout({ children, params }: LayoutProps) {
  const { lang } = await params;
  const { common: messages } = getMessages(lang);

  return (
    <ThemeProvider>
      <SetHtmlLang lang={lang} />
      <TranslationsProvider messages={messages} lang={lang}>
        <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
      </TranslationsProvider>
    </ThemeProvider>
  );
}
