import i18n from "i18n-js";
import { en } from "../langs/en";
import { pl } from "../langs/pl";
import * as Localization from "expo-localization";
import * as SecureStore from "expo-secure-store";

//const deviceLang = Localization.locale;

export default async function useLangTranslations() {
  const userLang = await SecureStore.getItemAsync("lang");
  if (userLang != null) {
    i18n.locale = userLang;
  } else if (userLang == null) {
    await SecureStore.setItemAsync("lang", "en-US");
  }
  i18n.fallbacks = true;
  i18n.translations = { en, pl };
  return;
}
