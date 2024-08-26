import { createInstance, InitOptions } from 'i18next'
import resourcesToBackend from 'i18next-resources-to-backend'
import { initReactI18next } from 'react-i18next/initReactI18next'
import { defaultNS, getOptions } from './settings'
import { Language } from '@/lib/definitions'

type TranslationOptions = InitOptions & {
  keyPrefix?: string;
};

const initI18next = async (language: Language, ns: string) => {
  const i18nInstance = createInstance()
  await i18nInstance
    .use(initReactI18next)
    .use(resourcesToBackend((language: Language, namespace: string) => import(`./locales/${language}/${namespace}.json`)))
    .init(getOptions(language, ns))
  return i18nInstance
}

/*
We're not using the i18next singleton here but creating a new instance on each useTranslation call, because during compilation everything seems to be executed in parallel. Having a separate instance will keep the translations consistent. See: https://locize.com/blog/next-app-dir-i18n/#step-3
*/

export async function useTranslation(
  language: Language,
  ns: string = defaultNS,
  options: TranslationOptions = {}
) {
  const i18nextInstance = await initI18next(language, ns);
  return {
    t: i18nextInstance.getFixedT(
      language,
      Array.isArray(ns) ? ns[0] : ns,
      options.keyPrefix
    ),
    i18n: i18nextInstance
  };
}
