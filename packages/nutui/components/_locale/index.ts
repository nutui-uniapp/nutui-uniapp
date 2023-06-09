import { reactive, ref } from 'vue'
import { deepMerge } from '../_utils'
import ZhCNLang from './lang/zh-CN'
import EnUSLang from './lang/en-US'

// 组件默认语言设置

export type Lang = Record<string, any>
const langs = reactive<Lang>({
  'zh-CN': new ZhCNLang(),
  'en-US': new EnUSLang(),
})
export class Locale {
  static currentLang = ref('zh-CN')
  static languages(): Lang {
    return langs[this.currentLang.value]
  }

  static use(lang: string, NewLanguages?: any) {
    if (NewLanguages)
      langs[lang] = new NewLanguages()

    this.currentLang.value = lang
  }

  static merge(lang: string, newLanguages: any) {
    if (newLanguages) {
      if (langs[lang])
        deepMerge(langs[lang], newLanguages)

      else
        this.use(lang, newLanguages)
    }
  }
}
export default Locale
export * from './lang/baseLang'
