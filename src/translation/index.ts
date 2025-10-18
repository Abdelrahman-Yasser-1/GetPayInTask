import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ar from './ar.json';
import en from './en.json';
import { getData, storeData } from '@src/common';
import { APP_LANGUAGES, MMKV_KEYS } from '@src/common/enum';
import i18next from 'i18next';
import { I18nManager } from 'react-native';
import RNRestart from 'react-native-restart';

type AppLanguages = keyof typeof appResources;

const appResources = {
  en: { translation: en },
  ar: { translation: ar },
};

const setI18NextConfig = () => {
  const storedLanguage = getData(MMKV_KEYS.TRANSLATION_KEY);
  const fallbackLng = Object.keys(appResources);

  i18n
    .use(initReactI18next) // pass the i18n instance to react-i18next.
    .init({
      // init i18next
      compatibilityJSON: 'v4',
      resources: appResources,
      lng: storedLanguage ?? APP_LANGUAGES.EN, // default language to use.
      fallbackLng: [...fallbackLng],
      debug: true,
    });
};

setI18NextConfig();

export const switchLanguage = (targetLang: Partial<AppLanguages>) => {
  storeData(MMKV_KEYS.TRANSLATION_KEY, targetLang);

  I18nManager.forceRTL(targetLang === APP_LANGUAGES.AR ? true : false);
  I18nManager.allowRTL(targetLang === APP_LANGUAGES.AR ? true : false);

  RNRestart.Restart();
};

//Note:If you need to access the t function or the i18next instance from outside of a React component you can simply use this function
export const onTranslate = (key: string, options = {}) => i18n.t(key, options);

export const availableLanguages = i18next.languages;

export const currentLanguage = i18next.language;

export const isArabic = i18n.language === APP_LANGUAGES.AR;

export default { i18n };
