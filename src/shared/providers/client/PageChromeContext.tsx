'use client';

import {
  createContext,
  useContext,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type PropsWithChildren,
} from 'react';

interface PageChromeState {
  hideFooter?: boolean;
  hideHeader?: boolean;
}

interface PageChromeContextValue {
  chrome: Required<PageChromeState>;
  registerChrome: (id: string, chrome: PageChromeState) => void;
  unregisterChrome: (id: string) => void;
}

const DEFAULT_PAGE_CHROME: Required<PageChromeState> = {
  hideFooter: false,
  hideHeader: false,
};

const PageChromeContext = createContext<PageChromeContextValue | null>(null);

let pageChromeIdSequence = 0;

const normalizeChrome = ({
  hideFooter = false,
  hideHeader = false,
}: PageChromeState): Required<PageChromeState> => ({
  hideFooter,
  hideHeader,
});

function PageChromeProvider({ children }: PropsWithChildren) {
  const [registry, setRegistry] = useState<Record<string, Required<PageChromeState>>>({});

  const value = useMemo<PageChromeContextValue>(() => {
    const chrome = Object.values(registry).reduce<Required<PageChromeState>>(
      (acc, entry) => ({
        hideFooter: acc.hideFooter || entry.hideFooter,
        hideHeader: acc.hideHeader || entry.hideHeader,
      }),
      DEFAULT_PAGE_CHROME,
    );

    return {
      chrome,
      registerChrome: (id, nextChrome) => {
        const normalized = normalizeChrome(nextChrome);

        setRegistry(prev => {
          const current = prev[id];
          if (
            current?.hideFooter === normalized.hideFooter &&
            current?.hideHeader === normalized.hideHeader
          ) {
            return prev;
          }

          return {
            ...prev,
            [id]: normalized,
          };
        });
      },
      unregisterChrome: id => {
        setRegistry(prev => {
          if (!prev[id]) return prev;

          const next = { ...prev };
          delete next[id];
          return next;
        });
      },
    };
  }, [registry]);

  return <PageChromeContext.Provider value={value}>{children}</PageChromeContext.Provider>;
}

function usePageChrome() {
  const context = useContext(PageChromeContext);
  if (!context) {
    throw new Error('usePageChrome must be used within PageChromeProvider.');
  }

  return context;
}

function PageChromeController({ hideFooter = false, hideHeader = false }: PageChromeState) {
  const chromeIdRef = useRef<string>('');
  const { registerChrome, unregisterChrome } = usePageChrome();

  if (!chromeIdRef.current) {
    pageChromeIdSequence += 1;
    chromeIdRef.current = `page-chrome-${pageChromeIdSequence}`;
  }

  useLayoutEffect(() => {
    registerChrome(chromeIdRef.current, { hideFooter, hideHeader });

    return () => {
      unregisterChrome(chromeIdRef.current);
    };
  }, [hideFooter, hideHeader, registerChrome, unregisterChrome]);

  return null;
}

export { PageChromeController, PageChromeProvider, usePageChrome };
export type { PageChromeState };
