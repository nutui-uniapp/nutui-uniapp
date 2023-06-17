<script lang="ts" setup>
import { isH5 } from '@uni-helper/uni-env'
import icons from '../../../../../icon-config.json'
</script>

<template>
  <div class="demo" :class="{ web: isH5 }">
    <h2 class="title">
      基础用法
    </h2>
    <nut-cell>
      <nut-icon name="dongdong" />
      <nut-icon name="JD" />
    </nut-cell>
    <h2 class="title">
      图片链接
    </h2>
    <nut-cell>
      <nut-icon
        size="40"
        name="https://img11.360buyimg.com/imagetools/jfs/t1/137646/13/7132/1648/5f4c748bE43da8ddd/a3f06d51dcae7b60.png"
      />
    </nut-cell>
    <h2 class="title">
      图标颜色
    </h2>
    <nut-cell>
      <nut-icon name="dongdong" color="#fa2c19" />
      <nut-icon name="dongdong" color="#64b578" />
      <nut-icon name="JD" color="#fa2c19" />
    </nut-cell>

    <h2 class="title">
      图标大小
    </h2>
    <nut-cell>
      <nut-icon name="dongdong" />
      <nut-icon name="dongdong" size="24" />
      <nut-icon name="dongdong" size="26" />
    </nut-cell>

    <nut-cell-group v-for="item in icons.data" :key="item.name" :title="item.name">
      <nut-cell>
        <ul class="ul">
          <li v-for="icon in item.icons" :key="icon" class="li">
            <nut-icon :name="icon" />
            <span class="span">{{ icon }}</span>
          </li>
        </ul>
      </nut-cell>
    </nut-cell-group>

    <nut-cell-group v-for="item in icons.style" :key="item.name" :title="item.name">
      <nut-cell>
        <ul class="icon-ul">
          <li v-for="it in item.icons" :key="it.name" class="icon-li">
            <nut-icon
              :name="it.name"
              :custom-class="`nut-icon-${it['animation-name']} nut-icon-${it['animation-time']}`"
            />
            <span>{{ it['animation-name'] }}</span>
          </li>
        </ul>
      </nut-cell>
    </nut-cell-group>
  </div>
</template>

<route lang="json">
{
  "style": {
    "navigationBarTitleText": "Icon"
  }
}
</route>

<style lang="scss">
.nut-cell {
  > .nutui-iconfont {
    margin-right: 10px;
  }

  .icon-ul,
  .h5-ul,
  .ul {
    display: flex;
    flex-wrap: wrap;
    width: 100%;

    .icon-li,
    .h5-li,
    .li {
      display: flex;
      flex: 0 0 25%;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      max-width: 25%;

      .span {
        height: 40px;
        font-size: 12px;
        text-align: center;
      }

      .nutui-iconfont {
        margin: 16px 0;
      }
    }
  }
}
</style>
