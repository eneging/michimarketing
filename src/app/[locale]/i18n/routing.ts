import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['es', 'en'],
  defaultLocale: 'es',
  // 👇 Opcional: cómo se ve la URL
  // 'always' => /es/about , /en/about
  // 'as-needed' => / (default) y /en/about
  localePrefix: 'as-needed'
});
