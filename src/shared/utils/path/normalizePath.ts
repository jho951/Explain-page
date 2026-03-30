const normalizePath = (pathname?: string | null): string => {
  if (!pathname) return '/';
  return pathname !== '/' && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
};

export { normalizePath };
