import type { BaseLang } from '../_locale/lang/baseLang'
import { Locale } from '../_locale/locale'
import { getPropByPath, isFunction } from '../_utils'

export const { currentLang } = Locale
// export function useTranslate(object: Record<keyof Lang, any>) {
//   for (const [key, value] of Object.entries(object))
//     Locale.merge(key as langKeys, value)
// }

export function useTranslate(compName: string) {
  /**
 * @param keyPath
 * @param compName 组件名
 * @param args
 * @returns
 */
  function translate(keyPath: keyof BaseLang, ...args: unknown[]): string {
    // 依赖响应能力
    const languages = Locale.languages()
    console.log(languages)

    const text = getPropByPath(languages, `${compName.split('-').slice(1).join('-').replace('-', '')}.${keyPath}`) || getPropByPath(languages, keyPath)

    return isFunction(text) ? text(...args) : text
  }
  return {
    translate,
  }
}

export function translateChange() {
  let href = ''
  const { location } = window.parent
  const { currentLang } = Locale
  if (currentLang.value === 'zh-CN') {
    href = location.href.replace('zh-CN', 'en-US')
    Locale.use('en-US')
  }
  else {
    href = location.href.replace('en-US', 'zh-CN')
    Locale.use('zh-CN')
  }
  location.href = href
}
