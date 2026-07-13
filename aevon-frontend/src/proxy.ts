import createMiddleware from 'next-intl/middleware';

export const proxy = createMiddleware({
  locales: ['en', 'fr', 'ar'],
  defaultLocale: 'en'
});

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
};
