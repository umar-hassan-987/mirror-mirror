import en from './locales/en';
import ar from './locales/ar';

export const locales = {
  en,
  ar
};

export const defaultLocale = 'en';

export function getTranslation(locale, key) {
  const keys = key.split('.');
  let value = locales[locale];
  
  for (const k of keys) {
    if (value && value[k]) {
      value = value[k];
    } else {
      // Fallback to English if key is missing in other language
      if (locale !== 'en') {
         return getTranslation('en', key);
      }
      return key; // Return the key string if translation not found
    }
  }
  
  return value;
}
