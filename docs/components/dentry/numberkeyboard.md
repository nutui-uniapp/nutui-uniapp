# NumberKeyboard 数字键盘

### 介绍

虚拟数字键盘，用于输入支付密码的场景。

### 默认键盘

在线调试请将浏览器变为手机模式

```html
<template>
    <nut-cell :isLink="true" @click="showKeyBoard"  title="默认键盘"></nut-cell>
    <nut-number-keyboard v-model:visible="visible" @input="input" @delete="onDelete" @close="close"> </nut-number-keyboard>
</template>
<script>
import { ref } from 'vue';
export default{
  setup() {
    const visible = ref(false);
    function showKeyBoard() {
      visible.value = true;
    }
    function input(number) {
      console.log(`输入：${number}`);
    }
    function onDelete() {
      console.log('删除');
    }
    function close() {
      visible.value = false;
    }
    return {
      visible,
      input,
      showKeyBoard,
      close,
      onDelete

    };
  }
  }
</script>
```

### 带右侧栏键盘

```html
<template>
    <nut-cell :isLink="true" @click="showKeyBoard"  title="带右侧栏键盘"></nut-cell>
     <nut-number-keyboard
      type="rightColumn"
      v-model:visible="visible"
      :custom-key="customKey"
      confirm-text="支付"
      @input="input"
      @close="close"
    >
    </nut-number-keyboard>
</template>
<script>
import { ref,reactive } from 'vue';
export default{
  setup() {
    const visible = ref(false);
    const customKey = reactive(['.']);
    function showKeyBoard() {
      visible.value = true;
    }
    function input(number) {
      console.log(`输入：${number}`);
    }
    function close() {
      visible.value = false;
    }
    return {
      visible,
    customKey,
      input,
      showKeyBoard,
      close,

    };
  }
  }
</script>
```

### 随机数键盘

```html
<template>
    <nut-cell :isLink="true" @click="showKeyBoard"  title="随机数键盘"></nut-cell>
    <nut-number-keyboard
      type="rightColumn"
      v-model:visible="visible"
      :randomKeys="true"
      :custom-key="customKey"
      @input="input"
      @close="close"
    >
    </nut-number-keyboard>
</template>
<script>
import { ref,reactive } from 'vue';
export default{
  setup() {
    const visible = ref(false);
    const customKey = reactive(['.']);
    function showKeyBoard() {
      visible.value = true;
    }
    function input(number) {
      console.log(`输入：${number}`);
    }
    function close() {
      visible.value = false;
    }
    return {
      visible,
    customKey,
      input,
      showKeyBoard,
      close,
    };
  }
  }
</script>
```

### 带标题栏键盘

```html
<template>
     <nut-cell :isLink="true" @click="showKeyBoard(4)" title="带标题栏键盘"></nut-cell>
    <nut-number-keyboard
      title="默认键盘"
      v-model:visible="visible"
      :custom-key="customKey"
      @input="input"
      @close="close"
    >
    </nut-number-keyboard>
</template>
<script>
import { ref,reactive } from 'vue';
export default{
  setup() {
    const visible = ref(false);
    const customKey = reactive(['.']);
    function showKeyBoard() {
      visible.value = true;
    }
    function input(number) {
      console.log(`输入：${number}`);
    }
    function close() {
      visible.value = false;
    }
    return {
      visible,
      customKey,
      input,
      showKeyBoard,
      close,
    };
  }
  }
</script>
```

### 身份证键盘

```html
<template>
     <nut-cell :isLink="true" @click="showKeyBoard(4)"  title="身份证键盘"></nut-cell>
    <nut-number-keyboard
      v-model:visible="visible"
      :custom-key="customKey"
      @input="input"
      @close="close"
    >
    </nut-number-keyboard>
</template>
<script>
import { ref,reactive } from 'vue';
export default{
  setup() {
    const visible = ref(false);
    const customKey = reactive(['X']);
    function showKeyBoard() {
      visible.value = true;
    }
    function input(number) {
      console.log(`输入：${number}`);
    }
    function close() {
      visible.value = false;
    }
    return {
      visible,
      customKey,
      input,
      showKeyBoard,
      close,
    };
  }
  }
</script>
```

### 双向绑定

```html
<template>
      <nut-cell
      :isLink="true"
      desc-text-align="left"
      @click="showKeyBoard"
      :desc="value"
      title="双向绑定："
    ></nut-cell>
     <nut-number-keyboard
       v-model:visible="visible"
       v-model:value="value"
       maxlength="6"
       @close="close">
    </nut-number-keyboard>
</template>
<script>
import { ref,reactive } from 'vue';
export default{
  setup() {
    const visible = ref(false);
     const value = ref('');
    const customKey = reactive(['.']);
    function showKeyBoard() {
      visible.value = true;
    }
    function close() {
      visible.value = false;
    }
    return {
      visible,
      customKey,
      value,
      showKeyBoard,
      close,
    };
  }
  }
</script>
```

## API

### Props

| 参数            | 说明                                             | 类型             | 默认值                                         |
| --------------- | ------------------------------------------------ | ---------------- | ---------------------------------------------- |
| v-model:visible | 是否显示键盘                                     | boolean          | `false`                                        |
| v-model         | 当前输入值                                       | string           | -                                              |
| title           | 键盘标题                                         | string           | -                                              |
| type            | 键盘模式                                         | string           | `default`：默认样式<br>`rightColumn`：带右侧栏 |
| random-keys     | 随机数                                           | boolean          | `false`                                        |
| custom-key      | 自定义键盘额外的键                               | string []        | `数组形式最多支持添加2个,超出默认取前2项`      |
| overlay         | 是否显示遮罩                                     | boolean          | false                                          |
| maxlength       | 输入值最大长度，结合 v-model 使用                | number \| string | `6`                                            |
| confirm-text    | 自定义完成按钮文字，如"支付"，"下一步"，"提交"等 | string           | `完成`                                         |
| pop-class       | 自定义弹框类名                                   | string           | -                                              |

### Events

| 事件名 | 说明                           | 回调参数 |
| ------ | ------------------------------ | -------- |
| input  | 点击按键时触发                 | 按键内容 |
| delete | 点击删除键时触发               | -        |
| close  | 点击关闭按钮或非键盘区域时触发 | -        |
| confirm `v1.7.9` | 点击确认按钮 | - |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/components/basic/configprovider)。

| 名称                                                  | 默认值      |
| ----------------------------------------------------- | ----------- |
| --nut-numberkeyboard-width                            | 100%        |
| --nut-numberkeyboard-padding                          | 0           |
| --nut-numberkeyboard-background-color                 | #f2f3f5     |
| --nut-numberkeyboard-header-height                    | 34px        |
| --nut-numberkeyboard-header-padding                   | 6px 0 0 0   |
| --nut-numberkeyboard-header-color                     | #646566     |
| --nut-numberkeyboard-header-font-size                 | 16px        |
| --nut-numberkeyboard-header-close-padding             | 0 16px      |
| --nut-numberkeyboard-header-close-color               | #576b95     |
| --nut-numberkeyboard-header-close-font-size           | 14px        |
| --nut-numberkeyboard-header-close-background-color    | transparent |
| --nut-numberkeyboard-key-background-color             | #fff        |
| --nut-numberkeyboard-key-active-background-color      | #ebedf0     |
| --nut-numberkeyboard-key-height                       | 48px        |
| --nut-numberkeyboard-key-line-height                  | 1.5         |
| --nut-numberkeyboard-key-border-radius                | 8px         |
| --nut-numberkeyboard-key-font-size                    | 28px        |
| --nut-numberkeyboard-key-font-size-color              | #333        |
| --nut-numberkeyboard-key-finish-font-size             | 16px        |
| --nut-numberkeyboard-key-finish-font-size-color       | #fff        |
| --nut-numberkeyboard-key-finish-background-color      | #1989fa     |
| --nut-numberkeyboard-key-activeFinsh-background-color | #0570db     |
