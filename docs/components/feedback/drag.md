# Drag 拖拽

### 介绍

实现可拖拽的任意元素

### 基础用法

```html
<nut-drag>
  <div class="touch-dom">可点击，可拖拽</div>
</nut-drag>
```

### 限制拖拽方向

```html
<nut-drag direction="x">
  <div class="touch-dom">只能在X轴拖动</div>
</nut-drag>
```

### 限制拖拽方向

```html
<nut-drag direction="y">
  <div class="touch-dom">只能在Y轴拖动</div>
</nut-drag>
```

## API

### Props

| 参数      | 说明                                              | 类型    | 可选值 | 默认值                                |
|-----------|-------------------------------------------------|---------|--------|---------------------------------------|
| attract   | 是否开启自动吸边（根据 screenWidth 进行吸边）       | boolean | -      | `false`                               |
| direction | 拖拽元素的拖拽方向限制，**x**/**y**/**all** 三选一 | string  | -      | `all`                                 |
| boundary  | 拖拽元素的拖拽边界                                | object  | -      | `{top: 0,left: 0,right: 0,bottom: 0}` |
