# Comment 商品评论

### 介绍

用于进行评论列表的展示。

### 评论图片单行展示

默认情况下，单个商品的评论的图片是按照单行滑动进行展示的。

```html
<template>
<nut-comment
    :images="cmt.images"
    :videos="cmt.videos"
    :info="cmt.info"
    @click="handleclick"
    @clickImages="clickImages"
    :operation="['replay']"
  >
    <template #commentLabels>
      <image
        style="height:15px;width:50px"
        src="https://img11.360buyimg.com/imagetools/jfs/t1/211858/17/4258/12101/618e6f78Ed0edcadc/e83a673555edf59f.jpg"
      />
    </template>
</nut-comment>
</template>
<script lang="ts">
import { reactive, ref,onMounted } from 'vue';
export default {
  setup() {
    let cmt = ref({});
    onMounted(()=>{
        uni.request({
          url: 'https://storage.360buyimg.com/nutui/3x/comment_data.json', //仅为示例，并非真实的接口地址
          success: function (res) {
            cmt.value = res.data.Comment;
          }
        })
    })
    const handleclick = (info: any) => {
      console.log('进行跳转', info);
    };
    const clickImages = (imgs)=>{
      console.log('进行图片展示',imgs)
    }
    return {
      cmt,
      handleclick,
      clickImages
    };
  }
}
</script>
```

### 评论图片多行展示

通过 headerType 的值可以设置图片多行展示。

```html
<template>
<nut-comment
  headerType="complex"
  imagesRows="multi"
  :images="cmt.images"
  :videos="cmt.videos"
  :info="cmt.info"
  ellipsis="6"
  @clickImages="clickImages"
>
  <template #commentLabels>
    <img
      class="nut-comment-header__labels--item"
      src="https://storage.360buyimg.com/imgtools/78925d9440-f9e874d0-e93d-11eb-8e5c-0da9e18a13b1.png"
      style="height: 12px"
    />
  </template>

  <template #commentShopReply>
    <div class="nut-comment-shop">
      <text style="display:inline-block">京东美妆国际：</text
      >尊敬的客户您好，非常抱歉给您带来不愉快的购物体验，关于过敏，什么成分都不存在个别性和普遍性。
    </div>
  </template>
</nut-comment>

</template>
<script lang="ts">
import { reactive, ref,onMounted } from 'vue';
export default {
  setup() {
    let cmt = ref({});
    onMounted(()=>{
      uni.request({
          url: 'https://storage.360buyimg.com/nutui/3x/comment_data.json', //仅为示例，并非真实的接口地址
          success: function (res) {
            cmt.value = res.data.Comment;
          }
        })
    })
    const clickImages = (imgs)=>{
      console.log('进行图片展示',imgs)
    }
    return {
      cmt,
      clickImages
    };
  }
}
</script>
```

### 追评展示

```html
<template>
<nut-comment
  imagesRows="multi"
  :images="cmt.images"
  :videos="cmt.videos"
  :info="cmt.info"
  :follow="cmt.follow"
  @clickImages="clickImages"
></nut-comment>

</template>
<script lang="ts">
import { reactive, ref,onMounted } from 'vue';
export default {
  setup() {
    let cmt = ref({});
    onMounted(()=>{
      uni.request({
          url: 'https://storage.360buyimg.com/nutui/3x/comment_data.json', //仅为示例，并非真实的接口地址
          success: function (res) {
            cmt.value = res.data.Comment;
          }
        })
    })
    const clickImages = (imgs)=>{
      console.log('进行图片展示',imgs)
    }
    return {
      cmt,
      clickImages
    };
  }
}
</script>
```

## API

### Props

| 参数        | 说明                                          | 类型             | 默认值                       |
| ----------- | --------------------------------------------- | ---------------- | ---------------------------- |
| header-type | 头部样式展示类型，可选： `default`，`complex` | string           | `default`                    |
| images-rows | 评论图片展示行数，可选： `one`，`multi`       | string           | `one`                        |
| ellipsis    | 设置评论内容省略行数                          | string \| number | `2`                          |
| videos      | 视频信息                                      | Array            | `[]`                         |
| images      | 图片信息                                      | Array            | `[]`                         |
| info        | 评论详情                                      | object           | `{}`                         |
| follow      | 追评内容                                      | object           | `{}`                         |
| operation   | 配置底部按钮                                  | Array            | `["replay", "like", "more"]` |

### Events

| 事件名        | 说明                     | 回调参数             |
| ------------- | ------------------------ | -------------------- |
| click-operate | 点击底部操作按钮回调函数 | `type`               |
| click         | 点击评论内容回调函数     | `type`               |
| click-images  | 点击图片或视频触发       | `{type,index,value}` |

### Slots

`Comment` 组件在某些区域定义了插槽，可以按照需求进行替换。

| 名称             | 说明                         |
| ---------------- | ---------------------------- |
| commentLabels    | 评论用户的标签               |
| commentShopReply | 评论最底部，用于展示商家回复 |

### images 数组

images 数组中存放的是图片对象。

```javascript
const images = [{
    "smallImgUrl": '', // 小图，列表展示时使用
    "bigImgUrl": '', // 大图，大图展示使用
    "imgUrl": "", // 兜底图
}]
```

### videos 数组

```javascript
const videos = [{
    "mainUrl": "", // 视频遮罩图片
    "videoUrl": "", // 视频链接
}]
```

### info 对象

用于存放评论相关的信息。

```javascript
const info = {
  "content": "",  // 评论详情
  "nickName": "", // 评论人的姓名
  "score": 5, // 评论星星数
  "avatar": "",  // 评论人头像
  "time": "", // 评论时间
  "size": "", // 评论人购买的商品规格
  "replay":23, // 此评论的回复数
  "like":1, // 此评论的点赞数
}
```

### follow 对象

用于存放追评相关的信息。

```javascript
const follow = {
  "days": 0, // 购买多少天后进行追评
  "content": "", // 追评内容
  "images": [] // 追评图片
}
```

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/components/basic/configprovider)。

| 名称                                 | 默认值                   |
| ------------------------------------ | ------------------------ |
| --nut-comment-header-user-name-color | rgba(51, 51, 51, 1)      |
| --nut-comment-header-time-color      | rgba(153, 153, 153, 1)   |
| --nut-comment-bottom-label-color     | rgba(153, 153, 153, 1)   |
| --nut-comment-shop-color             | var(--nut-primary-color) |
