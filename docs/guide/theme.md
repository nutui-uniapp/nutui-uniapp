# 定制主题

### 介绍

uniapp-nutui 支持灵活的样式定制，满足多种视觉业务和品牌需求，包括但不限于全局主色调和特定组件视觉定制的支持。

### 方式一: 使用 CSS Variables 进行主题配置

`uniapp-nutui` 组件可以通过 CSS Vars 来组织样式，通过覆盖这些 CSS 变量，可以实现定制主题、动态切换主题等功能。 每个组件变量都在各个组件文档底部详细提供。

您可在 ConfigProvider 组件 进行体验。

我们更推荐使用替换 CSS Vars 的方式来进行个性化的主题配置。

### 使用 Sass 变量 进行主题配置

#### 1. 新建自定义变量 SCSS 文件
在本地项目中新建一个 SCSS 文件 custom_theme.scss 进行自定义。

  ```scss
  // 主色调
$primary-color: #478EF2;
$primary-color-end: #496AF2;
  ```
#### 2. 修改 vite配置文件

```ts
// vite.config.ts
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  // ...
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import \'@/assets/custom_theme.scss\';@import \'uniapp-nutui/styles/variables.scss\';',
      },
    },
  },
})
```

### 自定义组件的 style 或 class

在微信小程序环境组件的 class 和 style 不会被成功编译，如果你想自定义某些组件的 class 或 style，请传递props `customClass`和`customStyle`，目前不是每个组件都支持，后续会考虑支持到每个组件
