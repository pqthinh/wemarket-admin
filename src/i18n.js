import i18n from 'i18next'
import { reactI18nextModule } from 'react-i18next'
import detector from 'i18next-browser-languagedetector'
import backend from 'i18next-xhr-backend'

i18n
  .use(detector)
  .use(backend)
  .use(reactI18nextModule)
  .init({
    ns: ['vi', 'en'],
    defaultNS: 'vi',
    fallbackLng: 'vi',
    keySeparator: false,
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  })

export default i18n
