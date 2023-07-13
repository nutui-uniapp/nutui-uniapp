import { hyphenate } from './common'
import { isNumber, isString } from './is'

export type NormalizedStyle = Record<string, string | number>

const listDelimiterRE = /;(?![^(]*\))/g
const propertyDelimiterRE = /:([^]+)/
const styleCommentRE = /\/\*.*?\*\//gs

export function parseStringStyle(cssText: string): NormalizedStyle {
  const ret: NormalizedStyle = {}
  cssText
    .replace(styleCommentRE, '')
    .split(listDelimiterRE)
    .forEach((item) => {
      if (item) {
        const tmp = item.split(propertyDelimiterRE)
        tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim())
      }
    })
  return ret
}

export function stringifyStyle(styles: NormalizedStyle | string | undefined): string {
  let ret = ''
  if (!styles || isString(styles))
    return ret

  for (const key in styles) {
    const value = styles[key]
    const normalizedKey = key.startsWith('--') ? key : hyphenate(key)
    if (isString(value) || typeof value === 'number') {
      // only render valid values
      ret += `${normalizedKey}:${value};`
    }
  }
  return ret
}

export function getPx(value: string | number, unit = false) {
  if (isNumber(value))
    return unit ? `${value}px` : Number(value)

  return unit ? `${Number.parseInt(value)}px` : Number.parseInt(value)
}
