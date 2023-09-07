<script setup lang="ts">
import { defineComponent } from 'vue'
import { PREFIX } from '../_constants'
import { configProviderProps } from './configprovider'

const props = defineProps(configProviderProps)
function kebabCase(str: string): string {
  str = str.replace(str.charAt(0), str.charAt(0).toLocaleLowerCase())
  return str.replace(/([a-z])([A-Z])/g, (_, p1, p2) => `${p1}-${p2.toLowerCase()}`)
}
function colorRgb(str: string) {
  if (!str)
    return
  let sColor = str.toLowerCase()
  // 十六进制颜色值的正则表达式
  const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/
  // 如果是16进制颜色
  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      let sColorNew = '#'
      for (let i = 1; i < 4; i += 1)
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1))

      sColor = sColorNew
    }
    // 处理六位的颜色值
    const sColorChange = []
    for (let i = 1; i < 7; i += 2)
      sColorChange.push(Number.parseInt(`0x${sColor.slice(i, i + 2)}`))

    return sColorChange.join(',')
  }
  return null
}
function mapThemeVarsToCSSVars(themeVars: Record<string, string>) {
  if (!themeVars)
    return
  const cssVars: Record<string, string> = {}
  const primaryColor = props?.themeVars?.primaryColor
  // 为了处理一些组件的rgba透明颜色
  if (primaryColor) {
    cssVars['--nut-address-region-tab-line'] = `linear-gradient(90deg, ${primaryColor} 0%, rgba(${colorRgb(
          primaryColor,
        )},0.15) 100%) `
    cssVars['--nut-tabs-horizontal-tab-line-color'] = `linear-gradient(90deg, ${primaryColor} 0%, rgba(${colorRgb(
          primaryColor,
        )},0.15)100%)`
    cssVars['--nut-tabs-vertical-tab-line-color'] = `linear-gradient(180deg, ${primaryColor} 0%, rgba(${colorRgb(
          primaryColor,
        )},0.15) 100%) `
  }
  Object.keys(themeVars).forEach((key) => {
    cssVars[`--nut-${kebabCase(key)}`] = themeVars[key]
  })
  return cssVars
}
</script>

<script  lang="ts">
const componentName = `${PREFIX}-config-provider`

export default defineComponent ({
  name: componentName,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})
</script>

<template>
  <view :class="`nut-theme-${props.theme}`" :style="mapThemeVarsToCSSVars(themeVars)">
    <slot />
  </view>
</template>

<style lang="scss">
@import './index';
</style>
