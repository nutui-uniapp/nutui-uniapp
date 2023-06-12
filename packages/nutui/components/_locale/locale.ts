import { reactive, ref } from 'vue'
import { deepMerge } from '../_utils'
import ZhCNLang from './lang/zh-CN'
import EnUSLang from './lang/en-US'
import ZhTWLang from './lang/zh-TW'
import IdIDLang from './lang/id-ID'

// 组件默认语言设置
export type langKeys = 'zh-CN' | 'en-US' | 'zh-tw' | 'id-id'
export type Lang = Partial<Record<langKeys, any>>
const langs = reactive<Lang>({
  'zh-CN': new ZhCNLang(),
  'en-US': new EnUSLang(),
})

export { ZhCNLang, EnUSLang, IdIDLang, ZhTWLang }
export class Locale {
  static currentLang = ref<keyof Lang>('zh-CN')
  static languages() {
    return langs[this.currentLang.value]
  }

  static use(lang: keyof Lang, NewLanguages?: any) {
    if (NewLanguages)
      langs[lang] = new NewLanguages()

    this.currentLang.value = lang
  }

  static merge(lang: keyof Lang, newLanguages: any) {
    if (newLanguages) {
      if (langs[lang])
        deepMerge(langs[lang], newLanguages)

      else this.use(lang, newLanguages)
    }
  }
}
