type Theme = 'light' | 'dark';

function resolveSystemTheme(): Theme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export { resolveSystemTheme };
