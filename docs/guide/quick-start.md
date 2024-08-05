# 快速上手

> nutui-uniapp 提供了 `npm` 和 `uni_modules` 两种方式使用组件。

::: warning 提示
为了能够获得良好的开发体验，强烈建议使用[CLI](https://uniapp.dcloud.net.cn/quickstart-cli.html#install-vue-cli)创建项目。
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

    ```typescript
    import { defineConfig } from 'vite'
    import UniApp from '@dcloudio/vite-plugin-uni'
    import Components from '@uni-helper/vite-plugin-uni-components'
    import { NutResolver } from 'nutui-uniapp'

    // https://vitejs.dev/config
    export default defineConfig({
      // ...
      plugins: [
        // ...
        Components({
          resolvers: [NutResolver()],
        }),
        // 注意，UniApp插件一定要放到后面！
        UniApp()
      ]
    })
    ```

  > 如果使用 `pnpm` 管理依赖，请在项目根目录下的 `.npmrc` 文件中添加如下内容，详细请参考 [issue 389](https://github.com/antfu/unplugin-vue-components/issues/389)

    ```bash
    shamefully-hoist=true # or public-hoist-pattern[]=@vue*
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

- 类型提示

  > tsconfig.json（需要[IDE 支持](https://cn.vuejs.org/guide/typescript/overview.html#ide-support)）

    ```json5
    {
      "compilerOptions": {
        // ...
        "types": ["nutui-uniapp/global.d.ts"]
      }
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
    <!-- 注意这里的 lang="scss" -->
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

    ```typescript
    import { defineConfig } from 'vite'

    // https://vitejs.dev/config
    export default defineConfig({
      // ...
      css: {
        preprocessorOptions: {
          scss: {
            additionalData: `@import "nutui-uniapp/styles/variables.scss";`
          }
        }
      }
    })
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

    ```typescript
    import { defineConfig } from 'vite'
    import AutoImport from 'unplugin-auto-import/vite'

    // https://vitejs.dev/config
    export default defineConfig({
      // ...
      plugins: [
        // ...
        AutoImport({
          imports: [
            'vue',
            'uni-app',
            'pinia',
            {
              'nutui-uniapp/composables': [
                // 在这里添加需要自动导入的API
                'useToast'
              ]
            }
          ]
        })
      ]
    })
    ```

- 使用

  ```typescript
  // 现在无需手动导入即可直接使用
  const toast = useToast()
  ```

##### 手动导入

```typescript
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

## uni_modules方式

### 下载

---

前往 uniapp 插件市场下载 [nutui-uniapp](https://ext.dcloud.net.cn/plugin?id=13491)

::: warning
nutui-uniapp提供了npm和uni_modules两种方式使用组件。虽然提供了uni_modules，但是组件库在HBuilderX中编译存在许多的问题，所以我们强烈建议使用Vite CLI创建项目，它经过了我们的测试，还可以使用[uni-helper](https://github.com/uni-helper)团队带来的一系列优秀的库和Vite生态中的部分插件，你可以通过[官方CLI](https://uniapp.dcloud.net.cn/quickstart-cli.html)或是[create-uni](https://github.com/uni-helper/create-uni)创建项目，如果你需要一个功能丰富的起始模板，可以使用我们的[uniapp-template](https://github.com/yang1206/uniapp-template)
:::

### 配置

---

#### 组件导入

> 与上述npm方式中的[easycom方式](#easycom方式)相同

#### 样式引入

> 与上述npm方式中的[样式引入](#样式引入)相同，样式变量部分请使用uni.scss方式

#### API导入

> 自 `1.7.5` 开始 `nutui-uniapp` 提供了一些组合式函数

```typescript
// nutui-uniapp提供的组合式函数都在composables目录下
import { useToast } from '/uni_modules/nutui-uni/components/composables'

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
