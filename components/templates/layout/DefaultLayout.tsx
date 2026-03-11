import { LayoutProps } from '@/types/layout';
import { getMessages } from '@/utils/locale';
import { ReduxProvider } from '@/store/provider';
import { ThemeProvider } from '@/contexts/theme';
import { ClientProvider } from '@/contexts/client';
import { TranslationsProvider } from '@/contexts/translate';

export default async function DefaultLayout({ children, modal, params }: LayoutProps) {
  const { lang } = params;
  const { common: messages } = getMessages(lang);

  return (
    <ReduxProvider>
      <ThemeProvider>
        <TranslationsProvider messages={messages} lang={lang}>
          <ClientProvider modal={modal}>{children}</ClientProvider>
        </TranslationsProvider>
      </ThemeProvider>
    </ReduxProvider>
  );
}
