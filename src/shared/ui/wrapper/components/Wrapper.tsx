import { getMessages } from '@/shared/utils/locale';
import {
  ReduxProvider,
  ThemeProvider,
  ClientProvider,
  TranslationsProvider,
} from '@/shared/providers';
import type { WrapperProps } from '../types/Wrapper.types';

async function Wrapper({ children, modal, params }: WrapperProps) {
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

export default Wrapper;
