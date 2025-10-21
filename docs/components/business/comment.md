# Comment 商品评论

### 介绍

用于进行评论列表的展示。

### 评论图片单行展示

默认情况下，单个商品的评论的图片按照单行滑动进行展示。

```html
<template>
  <nut-comment
    :images="cmt.images"
    :videos="cmt.videos"
    :info="cmt.info"
    :operation="['replay']"
    @click="onClick"
    @clickImages="onImagesClick"
  >
    <template #commentLabels>
      <image src="https://img11.360buyimg.com/imagetools/jfs/t1/211858/17/4258/12101/618e6f78Ed0edcadc/e83a673555edf59f.jpg"></image>
    </template>
  </nut-comment>
</template>
```

```ts
const cmt = ref({});

function onClick(info: any) {
  console.log("点击", info);
}

function onImagesClick(event: any) {
  console.log("点击图片", event);
}

onMounted(() => {
  uni.request({
    url: "https://storage.360buyimg.com/nutui/3x/comment_data.json",
    success(res) {
      cmt.value = res.data.Comment;
    }
  });
});
```

### 评论图片多行展示

通过修改 `headerType` 的值可以设置图片多行展示。

```html
<template>
  <nut-comment
    :images="cmt.images"
    :videos="cmt.videos"
    :info="cmt.info"
    header-type="complex"
    images-rows="multi"
    ellipsis="6"
  >
    <template #commentLabels>
      <image src="https://storage.360buyimg.com/imgtools/78925d9440-f9e874d0-e93d-11eb-8e5c-0da9e18a13b1.png"></image>
    </template>

    <template #commentShopReply>
      <view>
        <text>京东美妆国际：</text>
        尊敬的客户您好，非常抱歉给您带来不愉快的购物体验，关于过敏，什么成分都不存在个别性和普遍性。
      </view>
    </template>
  </nut-comment>
</template>
```

### 追评展示

```html {6}
<template>
  <nut-comment
    :images="cmt.images"
    :videos="cmt.videos"
    :info="cmt.info"
    :follow="cmt.follow"
  ></nut-comment>
</template>
```

## API

### Props

| 参数          | 说明         | 类型                        | 可选值               | 默认值                          |
|-------------|------------|---------------------------|-------------------|------------------------------|
| header-type | 头部样式展示类型   | string                    | default / complex | default                      |
| images-rows | 评论图片展示行数   | string                    | one / multi       | one                          |
| ellipsis    | 设置评论内容省略行数 | boolean / string / number | -                 | `false`                      |
| videos      | 视频信息       | Array                     | -                 | `[]`                         |
| images      | 图片信息       | Array                     | -                 | `[]`                         |
| info        | 评论详情       | object                    | -                 | `{}`                         |
| follow      | 追评内容       | object                    | -                 | `{}`                         |
| operation   | 配置底部按钮     | Array                     | -                 | `["replay", "like", "more"]` |

#### images 数组

```javascript
const images = [{
  // 小图，列表展示时使用
  smallImgUrl: "",
  // 大图，大图展示使用
  bigImgUrl: "",
  // 兜底图
  imgUrl: ""
}];
```

#### videos 数组

```javascript
const videos = [{
  // 视频遮罩图片
  mainUrl: "",
  // 视频链接
  videoUrl: ""
}];
```

#### info 对象

用于存放评论相关的信息。

```javascript
const info = {
  // 评论详情
  content: "",
  // 评论人的姓名
  nickName: "",
  // 评论星星数
  score: 5,
  // 评论人头像
  avatar: "",
  // 评论时间
  time: "",
  // 评论人购买的商品规格
  size: "",
  // 此评论的回复数
  replay: 23,
  // 此评论的点赞数
  like: 1
};
```

#### follow 对象

用于存放追评相关的信息。

```javascript
const follow = {
  // 购买多少天后进行追评
  days: 0,
  // 追评内容
  content: "",
  // 追评图片
  images: []
};
```

### Events

| 事件名           | 说明           | 类型                          |
|---------------|--------------|-----------------------------|
| click         | 点击评论内容回调函数   | `(info: object) => void`    |
| click-operate | 点击底部操作按钮回调函数 | `(operate: string) => void` |
| click-images  | 点击图片或视频触发    | `(event: object) => void`   |

### Slots

| 名称               | 说明             |
|------------------|----------------|
| commentLabels    | 评论用户的标签        |
| commentShopReply | 评论最底部，用于展示商家回复 |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/components/basic/configprovider)。

| 名称                                   | 默认值                      |
|--------------------------------------|--------------------------|
| --nut-comment-header-user-name-color | rgba(51, 51, 51, 1)      |
| --nut-comment-header-time-color      | rgba(153, 153, 153, 1)   |
| --nut-comment-bottom-label-color     | rgba(153, 153, 153, 1)   |
| --nut-comment-shop-color             | var(--nut-primary-color) |
