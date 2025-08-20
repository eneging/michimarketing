import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

const locales = ['en', 'es'];

export default getRequestConfig(async ({ locale }) => {
   if (!locales.includes(locale as any)) notFound();

  return {
    messages: (await import(`../../[locale]/i18n/messages/${locale}.json`)).default
  };
});
