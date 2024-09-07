import { getPropByPath, isFunction } from '../components/_utils'
import { Locale, useCurrentLang } from './locale'

// export function useTranslate(object: Record<keyof Lang, any>) {
//   for (const [key, value] of Object.entries(object))
//     Locale.merge(key as langKeys, value)
// }

export function useTranslate(compName: string) {
  function translate(keyPath: string, ...args: unknown[]): string {
    // 依赖响应能力
    const { languages } = Locale

    const text = getPropByPath(languages(), `${compName.split('-').slice(1).join('-').replace('-', '')}.${keyPath}`) || getPropByPath(languages(), keyPath)

    // @ts-expect-error no types
    return isFunction(text) ? text(...args) : text
  }
  return {
    translate,
  }
}

export function translateChange() {
  let href = ''
  const { location } = window.parent
  const currentLang = useCurrentLang()
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
