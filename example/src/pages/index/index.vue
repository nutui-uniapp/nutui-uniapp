<script lang="ts">
import { reactive, toRefs } from 'vue'
import config from '../../../config.json'
import { useAppStore } from '@/store'

const { darkMode } = storeToRefs(useAppStore())
export default {
  name: 'NutUI',
  setup() {
    const state = reactive({
      nav: config.nav,
    })

    const reorder = (packages: any) => {
      return packages.sort((x: any, y: any) => {
        return x.name.toLowerCase().localeCompare(y.name.toLowerCase())
      })
    }

    const navigateTo = (name: string, enName: any) => {
      uni.navigateTo({
        url: `/pages/demo/${enName}/${name.toLowerCase()}/index`,
      })
    }

    return {
      ...toRefs(state),
      reorder,
      navigateTo,
      darkMode,
    }
  },
}
</script>

<template>
  <view class="index n-bg-2">
    <view class="index-header n-bg-2">
      <image
        src="https://img14.360buyimg.com/imagetools/jfs/t1/167902/2/8762/791358/603742d7E9b4275e3/e09d8f9a8bf4c0ef.png"
        alt="" srcset=""
      />
      <view class="info">
        <h1 class="title">
          NutUI
          <text class="ml-5px">
            For UniAPP
          </text>
        </h1>
        <text>京东风格的轻量级小程序组件库</text>
      </view>

      <!-- #ifdef H5 -->
      <ThemeSwitch class="ml-5" />
      <!-- #endif -->
    </view>
    <view class="index-components n-bg">
      <div v-for="_nav in nav" :key="_nav.name" class="com-item">
        <view class="title">
          {{ _nav.name }}
        </view>
        <div class="info">
          <template v-for="_package in reorder(_nav.packages)" :key="_package.name">
            <view v-if="_package.show && _package.taro && _package.exportEmpty !== false" class="info n-bg-2 n-text-color">
              <text class="link" @click="navigateTo(_package.name, _nav.enName)">
                {{ _package.name }}
                &nbsp;&nbsp;
                {{ _package.cName }}
              </text>
              <nut-icon size="14px" color="#979797" name="right" />
            </view>
          </template>
        </div>
      </div>
    </view>
  </view>
</template>

<route lang="json">
{
  "type":"home"
}
</route>

<style lang="scss">
.index {
  width: 100%;
  height: 100%;

  // padding-top: 30px;

  &-header {
    display: flex;
    align-items: center;
    height: 117px;
    padding: 0 34px;

    >image {
      flex-shrink: 0;
      width: 67px;
      height: 67px;
      margin-right: 18px;
    }

    .info {
      display: flex;
      flex-direction: column;

      .title {
        height: 48px;
        font-size: 34px;
        font-weight: 500;
        line-height: 48px;
        color: rgb(51 51 51 / 100%);
      }

      text {
        height: 18px;
        font-size: 12px;
        line-height: 18px;
        color: rgb(154 155 157 / 100%);
      }
    }
  }

  &-components {
    padding: 30px 25px;
    overflow: hidden;
    // background: #f7f8fa;
    border-radius: 30px 30px 0 0;

    >.com-item {
      margin-bottom: 17px;

      >.title {
        margin-bottom: 10px;
        font-size: 14px;
        line-height: 20px;
        color: rgb(144 156 164 / 100%);
      }

      >.info {
        .info {
          box-sizing: border-box;
          display: flex;
          align-items: center;
          width: 100%;
          height: 45px;
          padding: 0 24px;

          // box-shadow: 0px 1px 4px 0px rgba(102, 102, 102, 0.06);
          margin-bottom: 13px;
          margin-top: 13px;
          line-height: 45px;
          border-radius: 22px;

          .link {
            display: block;
            width: 100%;
            height: 100%;
            font-size: 15px;
            font-weight: bold;

            // color: rgba(51, 51, 51, 1);
          }
        }
      }
    }
  }
}
</style>
