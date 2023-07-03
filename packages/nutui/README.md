
<p align="center">
<img src="https://img14.360buyimg.com/imagetools/jfs/t1/167902/2/8762/791358/603742d7E9b4275e3/e09d8f9a8bf4c0ef.png" style="width:100px;" />
<h1 align="center">UniAPP-NutUi</h1>
<p align="center">京东风格的轻量级 Uniapp 组件库，支持移动端 H5 和 小程序开发</p>
<p align="center">
<a href="https://www.npmjs.com/package/uniapp-nutui"><img src="https://img.shields.io/npm/v/uniapp-nutui?color=c95f8b&amp;label=" alt="NPM version"></a></p>

## 介绍

UniAPP-NutUI 组件库，基于Taro版`NutUi` 4.x版本修改而来，适配了UniApp, 使用 Vue 技术栈开发小程序应用，开箱即用，帮助研发快速开发用户界面，提升开发效率，改善开发体验。

使用请参考[安装](https://yang1206.github.io/uniapp-nutui/guide/install.html)。

## 特性

- 🚀 80+ 高质量组件，覆盖移动端主流场景
- 💪 支持一套代码同时开发多端
- 📖 基于京东 APP 10.0 视觉规范
- 🍭 支持按需引用
- 💪 支持 TypeScript
- 💪 支持动态定制主题
- 🍭 支持暗黑模式
- 🌍 支持国际化

## 安装

```bash
pnpm add uniapp-nutui
```

## 使用

更新 `pages.json` 文件：

```json
{
  "easycom": {
    "autoscan": true,
    "custom": {
      "^nut(.*)": "uniapp-nutui/componentsuniapp-nutui/components/$1/$1.vue"
    }
  }
}
```

或者使用 [@uni-helper/vite-plugin-uni-components](https://github.com/uni-helper/vite-plugin-uni-components) 自动导入组件。

```ts
// vite.config.ts
import { defineConfig } from 'vite'

import Components from '@uni-helper/vite-plugin-uni-components'
import { NutResolver } from 'uniapp-nutui'

// https://vitejs.dev/config/
export default defineConfig({
  // ...
  plugins: [
    // ...
    Components({
      resolvers: [NutResolver()],
    }),
  ],
})
```

样式引入

<!-- 组件库与uniapp都依赖sass，请先安装sass -->

在项目文件 `app.vue` 文件中添加如下代码：

```css
@import 'uniapp-nutui/styles/index';
```

导入样式变量

```ts
// vite.config.ts
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  // ...
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "uniapp-nutui/styles/variables.scss";',
      },
    },
  },
})
```

And then enjoy it.

现在只需使用一个组件，它将按需自动导入。

```html
<template>
  <nut-button type="primary">
        主要按钮
  </nut-button>
</template>
```

## 感谢

- [Anu](https://github.com/jd-solanki/anu)
- [NutUi](https://github.com/jdf2e/nutui)
- [Uni-NutUi](https://github.com/jwaterwater/uni-nutui)
- [vin-ui](https://github.com/vingogo/vin-ui)
- [uni-helper](https://github.com/uni-helper)

## License

[MIT](https://github.com/yang1206/uniapp-nutui/blob/main/LICENSE) License &copy; 2022-PRESENT [Yang1206](https://github.com/yang1206) and all contributors.
