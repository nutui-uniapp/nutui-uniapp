# 快速上手

nutui-uniapp 提供了 [npm](#npm方式) 和 [uni-modules](#uni-modules方式) 两种方式使用组件

::: info 提示
为了能够获得良好的开发体验，强烈建议使用 `CLI` 创建项目并使用 `NPM` 方式使用组件，
你可以通过 [官方CLI](https://uniapp.dcloud.net.cn/quickstart-cli.html)
或者是 [create-uni](https://github.com/uni-helper/create-uni) 创建项目

---

我们也提供了一个功能丰富的起始模板 [uniapp-template](https://github.com/yang1206/uniapp-template)
和一个最小组件集成仓库 [nutui-uniapp-simple-demo](https://github.com/nutui-uniapp/nutui-uniapp-simple-demo)
:::

## NPM方式

### 安装

---

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

### 配置

---

#### 组件导入

::: warning 注意
自动按需导入组件有 `unplugin` 和 `easycom` 两种方式，请勿混用~
:::

##### <Badge type="tip">推荐</Badge> unplugin方式

- 安装插件

  > [@uni-helper/vite-plugin-uni-components](https://github.com/uni-helper/vite-plugin-uni-components)

  ::: code-group

    ```bash [pnpm]
    pnpm add -D @uni-helper/vite-plugin-uni-components
    ```

    ```bash [yarn]
    yarn add --dev @uni-helper/vite-plugin-uni-components
    ```

    ```bash [npm]
    npm install -D @uni-helper/vite-plugin-uni-components
    ```

  :::

- 配置插件

  > vite.config.ts

    ```ts
    import { defineConfig } from "vite";
    import UniApp from "@dcloudio/vite-plugin-uni";
    import UniComponents from "@uni-helper/vite-plugin-uni-components";
    import { NutResolver } from "nutui-uniapp";

    export default defineConfig({
      // ...
      plugins: [
        // ...
        // 确保放在 `UniApp()` 之前
        UniComponents({
          resolvers: [
            NutResolver()
          ]
        }),
        UniApp()
      ]
    });
    ```

  > 如果使用 `pnpm` 管理依赖，请在项目根目录下的
  `.npmrc` 文件中添加如下内容，详细请参考 [issue 389](https://github.com/antfu/unplugin-vue-components/issues/389)

    ```bash
    shamefully-hoist=true # or public-hoist-pattern[]=@vue*
    ```

- 类型提示

  > tsconfig.json（需要[IDE 支持](https://cn.vuejs.org/guide/typescript/overview.html#ide-support)）

    ```json5
    {
      "compilerOptions": {
        // ...
        "types": [
          "nutui-uniapp/global.d.ts"
        ]
      }
    }
    ```

##### easycom方式

- 配置easycom

  > pages.json（若原本已存在easycom字段，则添加easycom.custom字段中的内容）

    ```json5
    {
      "easycom": {
        "autoscan": true,
        "custom": {
          "^nut-(.*)?-(.*)": "nutui-uniapp/components/$1$2/$1$2.vue",
          "^nut-(.*)": "nutui-uniapp/components/$1/$1.vue"
        }
      }
      // ...
    }
    ```

#### 样式引入

- 安装sass

  > nutui-uniapp 依赖 `sass`

  ::: code-group

    ```bash [pnpm]
    pnpm add -D sass
    ```

    ```bash [yarn]
    yarn add --dev sass
    ```

    ```bash [npm]
    npm install -D sass
    ```

  :::

- 全局样式

  > App.vue

    ```html
    <!-- 注意这里的 lang="scss"，并且没有 scoped -->
    <style lang="scss">
    @import "nutui-uniapp/styles/index.scss";

    // ...
    </style>
    ```

- 样式变量

  > 以下两种方式导入样式变量，任选其一即可

  - uni.scss

    ```scss
    @import "nutui-uniapp/styles/variables.scss";
    ```

  - vite.config.ts

    ```ts
    import { defineConfig } from "vite";

    export default defineConfig({
      // ...
      css: {
        preprocessorOptions: {
          scss: {
            additionalData: `@import "nutui-uniapp/styles/variables.scss";`
          }
        }
      }
    });
    ```

#### API导入

> 自 `1.7.5` 开始 `nutui-uniapp` 提供了一些组合式函数，可以使用插件配置自动按需导入或者手动导入

##### 自动按需导入

- 安装插件

  > [unplugin-auto-import](https://github.com/unplugin/unplugin-auto-import)

  ::: code-group

    ```bash [pnpm]
    pnpm add -D unplugin-auto-import
    ```

    ```bash [yarn]
    yarn add --dev unplugin-auto-import
    ```

    ```bash [npm]
    npm install -D unplugin-auto-import
    ```

  :::

- 配置插件

  > vite.config.ts

    ```ts
    import { defineConfig } from "vite";
    import AutoImport from "unplugin-auto-import/vite";

    export default defineConfig({
      // ...
      plugins: [
        // ...
        AutoImport({
          imports: [
            "vue",
            {
              "nutui-uniapp/composables": [
                // 在这里添加需要自动导入的API
                "useToast"
              ]
            }
          ]
        })
      ]
    });
    ```

- 使用

  ```ts
  // 现在无需手动导入即可直接使用
  const toast = useToast()
  ```

##### 手动导入

```ts
// nutui-uniapp提供的组合式函数都在composables模块下
import { useToast } from 'nutui-uniapp/composables'

const toast = useToast()
```

### 完成

---

> 配置完成，现在所有的组件都可以直接使用，它将自动完成按需导入

```html
<template>
  <nut-button type="primary">主要按钮</nut-button>

  <!-- 或者（仅限unplugin方式） -->
  <NutButton type="primary">主要按钮</NutButton>
</template>
```

::: info 其他
关于 uniapp 的内置组件（例如 text、view、image 等）若需要类型提示，推荐使用
[@uni-helper/uni-app-types](https://github.com/uni-helper/uni-types/tree/main/packages/uni-app-types)
插件，按照其官方文档配置即可，需要注意你的 `vue-tsc` 依赖版本 和 `volar` 插件版本
:::

## uni_modules方式

::: warning 提示
nutui-uniapp虽然提供了uni_modules，但是组件库在HBuilderX中编译存在许多的问题，所以我们强烈建议使用Vite
CLI创建项目并且通过NPM方式使用组件，
它经过了我们的测试，还可以使用 [uni-helper](https://github.com/uni-helper) 团队带来的一系列优秀的库和Vite生态中的部分插件
:::

### 下载

---

前往 uniapp 插件市场下载 [nutui-uniapp](https://ext.dcloud.net.cn/plugin?id=13491)

### 配置

---

#### 组件导入

- 配置easycom

  > pages.json（若原本已存在easycom字段，则添加easycom.custom字段中的内容）

    ```json5
    {
      "easycom": {
        "autoscan": true,
        "custom": {
          "^nut-(.*)?-(.*)": "@/uni_modules/nutui-uni/components/$1$2/$1$2.vue",
          "^nut-(.*)": "@/uni_modules/nutui-uni/components/$1/$1.vue"
        }
      }
      // ...
    }
    ```

#### 样式引入

- 安装sass插件

  - HBuilderX项目：安装 [scss/sass编译](https://ext.dcloud.net.cn/plugin?id=2046) 插件

  - CLI项目：安装 `sass` 依赖

- 全局样式

  > App.vue

    ```html
    <!-- 注意这里的 lang="scss"，并且没有 scoped -->
    <style lang="scss">
    @import "@/uni_modules/nutui-uni/styles/index.scss";

    // ...
    </style>
    ```

- 样式变量

  > uni.scss

    ```scss
    @import "@/uni_modules/nutui-uni/styles/variables.scss";
    ```

#### API导入

> 自 `1.7.5` 开始 `nutui-uniapp` 提供了一些组合式函数

```ts
// nutui-uniapp提供的组合式函数都在composables目录下
import { useToast } from '@/uni_modules/nutui-uni/components/composables'

const toast = useToast()
```

### 完成

---

> 配置完成，现在所有的组件都可以直接使用，它将自动完成按需导入

```html
<template>
  <nut-button type="primary">主要按钮</nut-button>
</template>
```
