import { LayoutProps } from '@/types/layout';
import { getMessages } from '@/utils/locale';
import { ReduxProvider } from '@/store/provider';
import { ThemeProvider } from '@/shared/providers/theme';
import { ClientProvider } from '@/shared/providers/client';
import { TranslationsProvider } from '@/shared/providers/translate';

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
