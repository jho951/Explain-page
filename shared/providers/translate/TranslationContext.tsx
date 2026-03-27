'use client';

import { createContext, useEffect, useMemo } from 'react';
import { TranslateProviderProps, TranslationContextType } from '@/shared/providers/translate';

const TranslationsContext = createContext<TranslationContextType | null>(null);

function TranslationsProvider({ messages, lang, children }: TranslateProviderProps) {
  const value = useMemo(() => ({ messages, lang }), [messages, lang]);

  useEffect(() => {
    document.documentElement.lang = lang || 'ko';
  }, [lang]);

  return <TranslationsContext.Provider value={value}>{children}</TranslationsContext.Provider>;
}

TranslationsContext.displayName = 'TranslationsContext';

export { TranslationsProvider, TranslationsContext };
