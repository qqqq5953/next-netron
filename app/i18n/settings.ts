export const fallbackLng = 'tw'
export const languages = [fallbackLng, 'en', 'cn']

export const defaultNS = 'translation'
export const cookieName = 'i18next'

export function getOptions(lng = fallbackLng, ns = defaultNS) {
  return {
    // debug: true,
    supportedLngs: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns
  }
}

