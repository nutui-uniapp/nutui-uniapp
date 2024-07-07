import helper from 'components-helper'
import pkg from '../package.json'

function reComponentName(title: string) {
  const name = title.split(' ')[0]
    .replace(/\B([A-Z])/g, '-$1')
    .toLowerCase()

  return `nut-${name}`
}

function reWebTypesSource(title: string) {
  const name = title.split(' ')[0]
    .replace(/^\w|\s+\w/g, item => item.trim().toUpperCase())

  return {
    symbol: `Nut${name}`,
  }
}

function reDocUrl(_: string, header?: string, path?: string) {
  if (path == null)
    return undefined

  const url = `https://nutui-uniapp.netlify.app/${path.substring(5, path.length - 3)}.html`

  const hash = `${header ? header.replace(/ +/g, '-').toLowerCase() : ''}`

  return `${url}${hash ? `#${hash}` : ''}`
}

function reAttribute(value: string, key: string) {
  if ((key === '参数' || key === '事件名' || key === '名称') && value.includes(' '))
    value = value.split(' ')[0]

  if (key === '默认值')
    value = value.replace(/[`'"]/g, '')

  switch (value) {
    case '':
    case '-':
    case '—':
      return undefined
    case 'v-model':
      return 'model-value'
    default:
      return value
  }
}

helper({
  name: pkg.name,
  version: pkg.version,
  entry: 'docs/components/*/**/*.md',
  outDir: 'packages/nutui',
  space: 2,

  reComponentName,
  reWebTypesSource,
  reDocUrl,
  reAttribute,

  propsName: '参数',
  propsDescription: '说明',
  propsType: '类型',
  propsOptions: '可选值',
  propsDefault: '默认值',

  eventsName: '事件名',
  eventsDescription: '说明',

  slotsName: '名称',
  slotsDescription: '说明',
})
