import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import vi from './vi.json';
import en from './en.json';
import ko from './ko.json';
const resources = {
  en: en,
  vi: vi,
  ko: ko,
};

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources,
  lng: 'vi',
  debug: true,
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
});
export default i18n;
