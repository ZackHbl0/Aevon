import {getRequestConfig} from 'next-intl/server';
import {notFound} from 'next/navigation';

export const locales = ['en', 'fr', 'ar'];

export default getRequestConfig(async ({requestLocale, locale}: any) => {
  const finalLocale = locale || await requestLocale;
  if (!locales.includes(finalLocale as any)) notFound();

  return {
    locale: finalLocale,
    messages: (await import(`../messages/${finalLocale}.json`)).default
  };
});
