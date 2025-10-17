# Icon 图标

### 介绍

基于 IconFont 字体的图标集，可以通过 Icon 组件使用。

### 基础用法

Icon 的 `name` 属性支持传入图标名称或图片链接。

```html
<template>
  <nut-icon name="dongdong"></nut-icon>
  <nut-icon name="JD"></nut-icon>
  <nut-icon
    size="40"
    name="https://img11.360buyimg.com/imagetools/jfs/t1/137646/13/7132/1648/5f4c748bE43da8ddd/a3f06d51dcae7b60.png"
  ></nut-icon>
</template>
```

### 图标颜色

Icon 的 `custom-color` 属性用来设置图标的颜色。

```html
<template>
  <nut-icon name="dongdong" custom-color="#fa2c19"></nut-icon>
  <nut-icon name="dongdong" custom-color="#64b578"></nut-icon>
  <nut-icon name="JD" custom-color="#fa2c19"></nut-icon>
</template>
```

### 图标大小

Icon 的 `size` 属性用来设置图标的尺寸大小，默认单位为 `px`。

```html
<template>
  <nut-icon name="dongdong"></nut-icon>
  <nut-icon name="dongdong" size="24"></nut-icon>
  <nut-icon name="dongdong" size="16"></nut-icon>
</template>
```

### 通用动态图标

添加指定的 `class` 就可以实现图片动态效果，默认是播放 1 次，添加 `nut-icon-am-infinite` 类即可实现循环播放，
通过设置 CSS 变量可修改动画启动前的延迟间隔、动画在多久时间内完成。

```html
<template>
  <nut-icon class="nut-icon-am-jump nut-icon-am-infinite" name="dou-arrow-up"></nut-icon>
  <nut-icon class="nut-icon-am-blink nut-icon-am-infinite" name="star-fill-n"></nut-icon>
  <nut-icon class="nut-icon-am-rotate nut-icon-am-infinite" name="refresh2"></nut-icon>
  <nut-icon class="nut-icon-am-breathe nut-icon-am-infinite" name="heart-fill"></nut-icon>
  <nut-icon class="nut-icon-am-flash nut-icon-am-infinite" name="microphone"></nut-icon>
  <nut-icon class="nut-icon-am-bounce nut-icon-am-infinite" name="download"></nut-icon>
  <nut-icon class="nut-icon-am-shake nut-icon-am-infinite" name="message"></nut-icon>
</template>
```

```css
.nut-icon {
  --animate-duration: 1s;
  --animate-delay: 0s;
}
```

### 自定义图标

如果需要在现有 Icon 的基础上使用更多图标，可以引入第三方 iconfont 对应的字体文件和 CSS 文件，之后就可以在 Icon 组件中直接使用。

方案一：引入 iconfont <Badge type="tip">推荐</Badge>

1. 首先在 [iconfont](https://www.iconfont.cn) 生成你自定义的 Icon 文件下载存放至本地项目，参考
   [详细使用说明](https://www.iconfont.cn/help/detail?spm=a313x.7781069.1998910419.d8d11a391&helptype=code)

    ```bash
    /assets/font/demo.css
    /assets/font/demo_index.html
    /assets/font/iconfont.css
    /assets/font/iconfont.js
    /assets/font/iconfont.json
    /assets/font/iconfont.ttf
    /assets/font/iconfont.woff
    /assets/font/iconfont.woff2
    ```

2. 项目入口文件 `main.js` 引用 `iconfont.css`

    ```js
    import "./assets/font/iconfont.css";
    ```

3. 使用

    ```html
    <!--
      name 值根据 iconfont.css 中值对应填写
      font-class-name 指定类名为 iconfont
      class-prefix 指定类名前缀为 icon
    -->
    <nut-icon name="close" font-class-name="iconfont" class-prefix="icon"></nut-icon>
    ```

方案二：第三方自定义字体库

```css
@font-face {
  font-family: "my-icon";
  src: url("./my-icon.ttf") format("truetype");
}

.my-icon {
  font-family: "my-icon";
}

.my-icon-extra::before {
  content: "\e626";
}
```

```html
<nut-icon name="extra" font-class-name="my-icon" class-prefix="my-icon"></nut-icon>
```

自定义 iconfont [Demo示例](https://github.com/jdf2e/nutui-demo/blob/master/vite/src/App.vue)。

## API

### Props

| 参数              | 说明                         | 类型              | 可选值 | 默认值            |
|-----------------|----------------------------|-----------------|-----|----------------|
| name            | 图标名称或图片链接                  | string          | -   | -              |
| custom-color    | 图标颜色                       | string          | -   | -              |
| size            | 图标大小，如 `20px` `2em` `2rem` | string / number | -   | -              |
| font-class-name | 自定义 icon 字体基础类名            | string          | -   | nutui-iconfont |
| class-prefix    | 自定义 icon 类名前缀，用于使用自定义图标    | string          | -   | nut-icon       |

### Events

| 事件名   | 说明      | 回调参数                     |
|-------|---------|--------------------------|
| click | 点击图标时触发 | `(event: Event) => void` |
