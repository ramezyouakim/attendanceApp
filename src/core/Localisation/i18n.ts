import * as Localisation from 'expo-localization';
import { I18n } from "i18n-js";
import en from './en.json'
import ar from './ar.json'

const i18n = new I18n()

i18n.translations = {
  en: en,
  ['en-GB']: en,
  ['en-US']: en,
  ar: ar,
  ['ar-US']: ar
}

i18n.locale = Localisation.locale;
i18n.enableFallback = true;

export default i18n;