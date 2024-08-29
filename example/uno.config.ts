import { defineConfig, presetIcons, transformerDirectives, transformerVariantGroup } from 'unocss'
import { presetUni } from '@uni-helper/unocss-preset-uni'
import { isH5, isMp } from '@uni-helper/uni-env'

export default defineConfig({
  presets: [
    presetUni({
      uno: {
        dark: isH5 ? 'class' : 'media',
      },
      attributify: {
        ignoreAttributes: ['block', 'fixed', 'align'],
      },
    }),
    presetIcons({
      warn: true,
      scale: 1.2,
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
  theme: {
    preflightRoot: isMp ? ['page,::before,::after'] : undefined,
    colors: {
      context: 'rgb(var(--ano-c-context))',
      primary: '#fa2c19',
      success: 'rgb(39, 197, 48)',
      warning: 'rgb(255, 190, 13)',
      info: 'rgb(73, 101, 242)',
      danger: 'rgb(250, 44, 25)',

      aGray1: '#f7f8fa',
      aGray2: '#f2f3f5',
      aGray3: '#ebedf0',
      aGray4: '#dcdee0',
      aGray5: '#c8c9cc',
      aGray6: '#969799',
      aGray7: '#646566',
      aGray8: '#323233',

      lightBg: '#f3f4f6',
      darkBg: '#373739',
      placeholder: '#dcdcdc',
      grayBg: '#484849',
      darkBd: '#4c4d4f',
      softBg: '#e5e6eb',
      darkTitle: '#ececec',
      darkText: '#7c7c7d',
      darkSubText: 'rgba(255, 255, 255, 0.7)',
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
    'n-bg': 'bg-#eff2f5 dark:bg-#000000',
    'n-bg-2': 'bg-#ffffff dark:bg-#1a1a1a',
    'n-border': 'border-#ebedf0 dark:border-#3a3a3c',
    'n-active': 'bg-#f2f3f5 dark:bg-#3a3a3c',
    'n-active-h5': 'active:bg-#f2f3f5 active:dark:bg-#3a3a3c',
    'n-text-color': 'text-#323233 dark:text-#f5f5f5',
    'n-text-color-2': 'text-#969799 dark:text-#707070',
    'n-text-color-3': 'text-#c8c9cc dark:text-#4d4d4d',

    'n-text-mini': 'text-xs',
    'n-text-small': 'text-sm',
    'n-text-normal': 'text-base',
    'n-text-large': 'text-lg',

    'n-transition': 'transition-all duration-200',

    'n-solid': 'bg-context text-#ffffff dark:bg-op80 dark:text-op80',
    'n-outline': 'bg-transparent border border-solid border-context text-context dark:border-op80 dark:text-op80',
    'n-ghost': 'bg-transparent border border-dashed border-context text-context dark:border-op80 dark:text-op80',
    'n-light': 'bg-context text-context bg-op20 dark:text-op80',
    'n-text': 'bg-transparent text-context dark:text-op80',

    'n-hairline': 'relative after:content-[\'_\'] after:pointer-events-none after:absolute after:box-border after:top--50% after:right--50% after:bottom--50% after:left--50% after:n-border after:border-solid after:border-0 after:scale-50',
    'n-hairline-bottom': 'n-hairline after:border-b-1px',
  },
})
