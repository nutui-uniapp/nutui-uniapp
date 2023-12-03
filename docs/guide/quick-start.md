# 快速开始

> nutui-uniapp 提供了 npm 包和 uni_modules 包两种方式使用组件。
> 为了能够获得良好的开发体验，推荐使用[vite cli](https://uniapp.dcloud.net.cn/quickstart-cli.html#install-vue-cli)创建项目。

## npm 安装 (cli)

 ::: code-group

  ```bash [pnpm]
  pnpm add nutui-uniapp
  ```

  ```bash [yarn]
  yarn add nutui-uniapp
  ```

  ```bash [npm]
  npm install nutui-uniapp
  ```

  :::

### 配置 nutui-uniapp

### 按需导入

像下面这样更新 `pages.json` 文件：

```json
// pages.json
{
  "easycom": {
    "autoscan": true,
    "custom": {
      "^nut-(.*)?-(.*)": "nutui-uniapp/components/$1$2/$1$2.vue",
      "^nut-(.*)": "nutui-uniapp/components/$1/$1.vue"
    }
  }
}
```

### 组件 TS 类型支持

想要获取全局组件类型，需要使用 vscode 与[volar 插件](https://cn.vuejs.org/guide/typescript/overview.html#volar-takeover-mode)

请在 tsconfig.json 中通过 compilerOptions.type 指定全局组件类型。

```json
// tsconfig.json
{
  "compilerOptions": {
    // ...
    "types": ["nutui-uniapp/global.d.ts"]
  }
}
```

<Badge type="tip">推荐</Badge> 或者使用 [@uni-helper/vite-plugin-uni-components](https://github.com/uni-helper/vite-plugin-uni-components) 自动导入组件

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import Components from '@uni-helper/vite-plugin-uni-components'
import { NutResolver } from 'nutui-uniapp'

// https://vitejs.dev/config/
export default defineConfig({
  // ...
  plugins: [
    // ...
    Components({
      resolvers: [NutResolver()],
    }),
    // uni 插件一定要放到后面
    uni()
  ],
})
```

如果你使用 `pnpm` ，请在根目录下创建一个 `.npmrc` 文件，参见[issue](https://github.com/antfu/unplugin-vue-components/issues/389)。

```bash
// .npmrc
public-hoist-pattern[]=@vue*
// or
// shamefully-hoist = true
```

see more in [unplugin-vue-components](https://github.com/antfu/unplugin-vue-components#installation)

### 样式引入

<!-- 组件库与 uniapp 都依赖 sass，请先安装 sass -->

在项目文件 `app.vue` 文件中添加如下代码：

```scss
<style lang="scss">
@import 'nutui-uniapp/styles/index';
</style>
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
        additionalData: '@import "nutui-uniapp/styles/variables.scss";',
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

## HBuilderX 导入

前往 uniapp 插件市场下载 [nutui-uniapp](https://ext.dcloud.net.cn/plugin?id=13491)

> nutui-uniapp 提供了 npm 包和 uni_modules 包两种方式使用组件。虽然提供了 uni_modules，但是组件库在 hbuilder 中编译存在一些奇奇怪怪的问题，因此仅推荐使用 vite cli，并且能够提供更好的 ts 支持与开发体验

### 按需导入

像下面这样更新 `pages.json` 文件：

```json
// pages.json
{
  "easycom": {
    "autoscan": true,
    "custom": {
      "nut-(.*)?-(.*)": "@/uni_modules/nutui-uni/components/nutui-uni/components/$1$2/$1$2.vue",
      "nut-(.*)": "@/uni_modules/nutui-uni/components/nutui-uni/components/$1/$1.vue"
    }
  }
}
```

### 样式引入

<!-- 组件库与 uniapp 都依赖 sass，请先安装 sass -->

在项目文件 `app.vue` 文件中添加如下代码：

```scss
<style lang="scss">
@import '@/uni_modules/nutui-uni/components/nutui-uni/styles/index.scss';
</style>
```

导入样式变量

在项目文件 `uni.scss` 文件中添加如下代码：

```scss
@import '@/uni_modules/nutui-uni/components/nutui-uni/styles/variables.scss';
```

然后就可以使用组件了

```html
<template>
  <nut-button type="primary">
        主要按钮
  </nut-button>
</template>
```
