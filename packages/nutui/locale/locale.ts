import { reactive, ref } from 'vue'
import { deepAssign } from '../components/_utils'
import type { BaseLang } from './lang/baseLang'
import { EnUSLang } from './lang/en-US'
import { IdIDLang } from './lang/id-ID'
import { ZhCNLang } from './lang/zh-CN'
import { ZhTWLang } from './lang/zh-TW'

// 组件默认语言设置
export type langKeys = 'zh-CN' | 'en-US' | 'zh-tw' | 'id-id'
export type Lang = Partial<Record<langKeys, any>>

export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends Record<any, any> ? DeepPartial<T[K]> : T[K]
}

export { EnUSLang, IdIDLang, ZhCNLang, ZhTWLang }

const currentLang = ref<keyof Lang>('zh-CN')
const langs = reactive<Lang>({
  'zh-CN': ZhCNLang(),
  'en-US': EnUSLang(),
})

export const useCurrentLang = () => currentLang

export const Locale = {

  languages(): BaseLang {
    return langs[currentLang.value]
  },

  use(lang: keyof Lang, Languages?: DeepPartial<BaseLang>) {
    currentLang.value = lang
    if (Languages)
      langs[lang] = Languages
  },

  merge(Languages: DeepPartial<BaseLang>) {
    deepAssign(this.languages() as any, Languages)
  },
}
