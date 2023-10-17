import { hyphenate } from './common'
import { isEmpty, isNumber, isString } from './is'

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

/**
 * @description 样式转换
 * 对象转字符串，或者字符串转对象
 * @param {object | string} customStyle 需要转换的目标
 * @param {string} target 转换的目的，object-转为对象，string-转为字符串
 * @returns {object|string}
 */
export function addStyle(customStyle: string | object, target = 'object') {
  // 字符串转字符串，对象转对象情形，直接返回
  if (
    isEmpty(customStyle)
    || (typeof customStyle === 'object' && target === 'object')
    || (target === 'string' && typeof customStyle === 'string')
  )
    return customStyle

  // 字符串转对象
  if (target === 'object') {
    // 去除字符串样式中的两端空格(中间的空格不能去掉，比如padding: 20px 0如果去掉了就错了)，空格是无用的
    customStyle = trim(customStyle)
    // 根据";"将字符串转为数组形式
    const styleArray = customStyle.split(';')
    const style: any = {}
    // 历遍数组，拼接成对象
    for (let i = 0; i < styleArray.length; i++) {
      // 'font-size:20px;color:red;'，如此最后字符串有";"的话，会导致styleArray最后一个元素为空字符串，这里需要过滤
      if (styleArray[i]) {
        const item = styleArray[i].split(':')
        style[trim(item[0])] = trim(item[1])
      }
    }
    return style
  }
  // 这里为对象转字符串形式
  let string = ''
  for (const i in customStyle as any) {
    // 驼峰转为中划线的形式，否则css内联样式，无法识别驼峰样式属性名
    const key = i.replace(/([A-Z])/g, '-$1').toLowerCase()
    string += `${key}:${customStyle[i]};`
  }
  // 去除两端空格
  return trim(string)
}

/**
 * @description 去除空格
 * @param String str 需要去除空格的字符串
 * @param String pos both(左右)|left|right|all 默认both
 */
export function trim(str: string, pos = 'both') {
  str = String(str)
  if (pos === 'both')
    return str.replace(/^\s+|\s+$/g, '')

  if (pos === 'left')
    return str.replace(/^\s*/, '')

  if (pos === 'right')
    return str.replace(/(\s*$)/g, '')

  if (pos === 'all')
    return str.replace(/\s+/g, '')

  return str
}
