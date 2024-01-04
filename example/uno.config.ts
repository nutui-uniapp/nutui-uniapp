import type { Preset, SourceCodeTransformer } from 'unocss'

import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

import { isH5, isMp } from '@uni-helper/uni-env'

import { presetApplet, presetRemRpx, transformerApplet, transformerAttributify } from 'unocss-applet'

const presets: Preset[] = []

const transformers: SourceCodeTransformer[] = []
const darkMode = isH5 ? 'class' : 'media'

if (isMp) {
  presets.push(presetApplet({ dark: darkMode }))
  presets.push(presetRemRpx())
  transformers.push(transformerAttributify({ ignoreAttributes: ['block', 'fixed', 'align'] }))
  transformers.push(transformerApplet())
}
else {
  presets.push(presetUno({ dark: darkMode }))
  presets.push(presetAttributify())
  presets.push(presetRemRpx({ mode: 'rpx2rem' }))
}

export default defineConfig({
  // cli: {
  //   entry: {
  //     patterns: ['components/**/*.{vue,ts}'],
  //     outFile: 'dist/styles.css',
  //   },
  // },
  presets: [
    presetIcons({
      scale: 1.2,
      warn: true,
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      },
    }),
    ...presets,
  ],
  transformers: [transformerDirectives(), transformerVariantGroup(), ...transformers],
  theme: {
    preflightRoot: isMp ? ['page,::before,::after'] : undefined,
    colors: {
      context: 'rgb(var(--ano-c-context))',
      primary: '#fa2c19',
      success: 'rgba(39, 197, 48,1)',
      info: 'rgba(73, 101, 242,1)',
      warning: 'rgb(255, 190, 13)',
      danger: 'rgb(250, 44, 25)',

      aGray1: '#f7f8fa',
      aGray2: '#f2f3f5',
      aGray3: '#ebedf0',
      aGray4: '#dcdee0',
      aGray5: '#c8c9cc',
      aGray6: '#969799',
      aGray7: '#646566',
      aGray8: '#323233',

      lightBg: '#F3F4F6',
      darkBg: '#373739',
      placeholder: '#DCDCDC',
      grayBg: '#484849',
      darkBd: '#4C4D4F',
      softBg: '#E5E6EB',
      darkTitle: '#ECECEC',
      darkText: '#7C7C7D',
      darkSubText: 'rgba(255,255,255,.7)',
    },
  },
  rules: [
    [
      'p-safe',
      {
        padding:
          'env(safe-aren-inset-top) env(safe-aren-inset-right) env(safe-aren-inset-bottom) env(safe-aren-inset-left)',
      },
    ],
    ['pt-safe', { 'padding-top': 'env(safe-aren-inset-top)' }],
    ['pb-safe', { 'padding-bottom': 'env(safe-aren-inset-bottom)' }],
  ],
  shortcuts: {
    'n-bg': 'bg-[#eff2f5] dark:bg-[#000000]',
    'n-bg-2': 'bg-white dark:bg-[#1A1A1A]',
    'n-border': 'border-[#EBEDF0] dark:border-[#3A3A3C]',
    'n-active': 'bg-[#F2F3F5] dark:bg-[#3A3A3C]',
    'n-active-h5': 'active:bg-[#F2F3F5] active:dark:bg-[#3A3A3C]',
    'n-text-color': 'text-[#323233] dark:text-[#F5F5F5]',
    'n-text-color-2': 'text-[#969799] dark:text-[#707070]',
    'n-text-color-3': 'text-[#C8C9CC] dark:text-[#4D4D4D]',

    'n-text-mini': 'text-xs',
    'n-text-small': 'text-sm',
    'n-text-normal': 'text-base',
    'n-text-large': 'text-lg',

    'n-transition': 'transition-all duration-200',

    'n-solid': 'bg-context text-white dark:bg-op80 dark:text-op80',
    'n-outline': 'bg-transparent border border-solid border-context text-context dark:border-op80 dark:text-op80',
    'n-ghost': 'bg-transparent border border-dashed border-context text-context dark:border-op80 dark:text-op80',
    'n-light': 'bg-context text-context bg-op20 dark:text-op80',
    'n-text': 'bg-transparent text-context dark:text-op80',

    'n-hairline': 'relative after:content-[\'_\'] after:pointer-events-none after:absolute after:box-border after:top--50% after:right--50% after:bottom--50% after:left--50% after:n-border after:border-solid after:border-0 after:scale-50',
    'n-hairline-bottom': 'n-hairline after:border-b-1px',
  },

})
