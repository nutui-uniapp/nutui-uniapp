# 安装

为了能够获得良好的开发体验，目前仅推荐使用vite

## 安装依赖

::: code-group

  ```bash [pnpm]
  pnpm add uniapp-nutui
  ```

  ```bash [yarn]
  yarn add uniapp-nutui
  ```

  ```bash [npm]
  npm install uniapp-nutui
  ```

:::

## 配置 UniAPP-NutUi

## 按需导入

像下面这样更新 `pages.json` 文件：

```json
// pages.json
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

### 样式引入

<!-- 组件库与uniapp都依赖sass，请先按照sass -->

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

现在只需使用一个组件，它将按需自动导入。

```html
<template>
  <nut-button type="primary">
        主要按钮
  </nut-button>
</template>
```
