<p align="center">
<img src="https://img14.360buyimg.com/imagetools/jfs/t1/167902/2/8762/791358/603742d7E9b4275e3/e09d8f9a8bf4c0ef.png"
width="100"
height="100" style="max-width: 100%;" />
</p>
<h1 align="center">UniAPP-NutUi</h1>
<p align="center">京东风格的轻量级 Uniapp 组件库，支持移动端 H5 和 小程序开发</p>
<p align="center">
<a href="https://www.npmjs.com/package/uniapp-nutui"><img src="https://img.shields.io/npm/v/uniapp-nutui?color=c95f8b&amp;label=" alt="NPM version"></a></p>

<p align="center">
   <img src="https://s2.loli.net/2023/07/05/eJwPvqCY8EcZ7Vi.png" width="164" alt="NutUI" />
  &nbsp;
  <img src="https://s2.loli.net/2023/07/05/QyW2RHcmnuvIFwp.jpg" width="166" title="请用微信扫码">
  &nbsp;
</p>

## 介绍

UniAPP-NutUI 组件库，基于Taro版[`NutUi`](https://nutui.jd.com/#/) 4.x版本修改而来，适配了UniApp, 使用 Vue 技术栈开发小程序应用，开箱即用，帮助研发快速开发用户界面，提升开发效率，改善开发体验。

使用请参考[快速开始](https://uniapp-nutui.tech/guide/quick-start.html)。

## 特性

- 🚀 70+ 高质量组件，覆盖移动端主流场景
- 💪 支持一套代码同时开发多端
- 📖 基于京东 APP 10.0 视觉规范
- 🍭 支持按需引用
- 💪 支持 TypeScript
- 💪 支持动态定制主题
- 🍭 支持暗黑模式
- 🌍 支持国际化

## 安装

> uniapp-nutui 提供了 npm 包和 uni_modules 包的方式安装组件。推荐使用 vite cli安装npm包，可以获得良好的 ts支持和更好的开发体验，npm包的更新维护也会更频繁及时

### 方式一：npm

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
      "^nut-(.*)?-(.*)": "uniapp-nutui/components/$1$2/$1$2.vue",
      "^nut-(.*)": "uniapp-nutui/components/$1/$1.vue"
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

### 方式二：uni_modules

前往 uniapp插件市场下载 [nutui-uniapp](https://ext.dcloud.net.cn/plugin?id=13491)

使用方式可查看[安装](https://uniapp-nutui.tech/guide/install.html)。

## 感谢

- [Anu](https://github.com/jd-solanki/anu)
- [NutUi](https://github.com/jdf2e/nutui)
- [Uni-NutUi](https://github.com/jwaterwater/uni-nutui)
- [vin-ui](https://github.com/vingogo/vin-ui)
- [uni-helper](https://github.com/uni-helper)

## License

[MIT](https://github.com/yang1206/uniapp-nutui/blob/main/LICENSE) License &copy; 2022-PRESENT [Yang1206](https://github.com/yang1206) and all contributors.
