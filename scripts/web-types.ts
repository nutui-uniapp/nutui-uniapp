import { arrayToRegExp, getTypeSymbol, hyphenate, isCommonType, isUnionType, main } from 'components-helper'
import type { ReAttribute, ReComponentName, ReDocUrl, ReWebTypesSource, ReWebTypesType } from 'components-helper'
import pkg from '../package.json'

const reComponentName: ReComponentName = (title) => {
  return `nut-${hyphenate(title.split(' ')[0])}`
}

const reDocUrl: ReDocUrl = (_, header, path) => {
  if (path == null) {
    return undefined
  }

  const base = 'https://nutui-uniapp.pages.dev/'

  const _path = path.replace(/^docs\/|\.md$/g, '')

  const _header = header ? header.replace(/\s+/g, '-').toLowerCase() : ''

  return `${base}${_path}.html${_header ? `#${_header}` : ''}`
}

function getPureAttribute(value: string) {
  return value.replace(/\s*`.*`/, '').trim()
}

const reAttribute: ReAttribute = (value, key) => {
  if (key === '参数' || key === '事件名' || key === '名称') {
    value = getPureAttribute(value)
  }
  else if (key !== '说明') {
    value = value.replace(/`(\d+\.\d+\.\d+)`/g, '')
      .replace(/[`'"]/g, '')
  }

  if (value === '' || /^([-—])$/.test(value)) {
    return undefined
  }
  else if (/v-model:(.+)/.test(value)) {
    const _value = value.match(/v-model:(.+)/)
    return _value ? _value[1] : undefined
  }
  else if (/v-model/.test(value)) {
    return 'model-value'
  }

  return value
}

const reWebTypesSource: ReWebTypesSource = (title) => {
  const name = title.split(' ')[0]
    .replace(/^\w|\s+\w/g, item => item.trim().toUpperCase())

  return {
    symbol: `Nut${name}`,
  }
}

const typeMap = {
  'vue': ['Component', 'VNode', 'CSSProperties', 'StyleValue'],
  'nutui-uniapp': [],
}

function findModule(type: string) {
  let result: string | undefined

  for (const key in typeMap) {
    const regExp = arrayToRegExp(typeMap[key as keyof typeof typeMap])
    const inModule = regExp.test(getTypeSymbol(type))

    if (inModule) {
      result = key
      break
    }
  }

  return result
}

const reWebTypesType: ReWebTypesType = (type) => {
  const isPublicType = isCommonType(type)
  const isNumber = /^\d+$/.test(type)
  const symbol = getTypeSymbol(type)
  const isUnion = isUnionType(symbol)
  const module = findModule(symbol)

  return isPublicType || isNumber || !symbol || isUnion
    ? type
    : { name: type, source: { symbol, module } }
}

main({
  name: pkg.name,
  version: pkg.version,
  entry: 'docs/components/*/**/*.md',
  outDir: 'packages/nutui',
  space: 2,
  separator: '/',

  reComponentName,
  reDocUrl,
  reAttribute,
  reWebTypesSource,
  reWebTypesType,

  props: 'props',
  propsName: '参数',
  propsDescription: '说明',
  propsType: '类型',
  propsOptions: '可选值',
  propsDefault: '默认值',

  events: 'events',
  eventsName: '事件名',
  eventsDescription: '说明',

  slots: 'slots',
  slotsName: '名称',
  slotsDescription: '说明',
  slotsType: '类型',
  slotsSubtags: '子标签',

  directives: 'directives',
  directivesName: '名称',
  directivesDescription: '说明',
  directivesType: '类型',
})
