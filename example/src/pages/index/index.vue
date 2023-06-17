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
      console.log(`/${enName}/pages/${name.toLowerCase()}/index`)

      uni.navigateTo({
        url: `/demo/${enName}/pages/${name.toLowerCase()}/index`,
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
  <nut-config-provider :theme="darkMode ? 'dark' : ''">
    <view class="index">
      <view class="index-header">
        <image
          src="https://img14.360buyimg.com/imagetools/jfs/t1/167902/2/8762/791358/603742d7E9b4275e3/e09d8f9a8bf4c0ef.png"
          alt="" srcset=""
        />
        <view class="info">
          <h1 class="title">
            NutUI
            <text>For UniAPP</text>
          </h1>
          <text>京东风格的轻量级小程序组件库</text>
        </view>

        <ThemeSwitch />
      </view>
      <view class="index-components n-bg">
        <div v-for="_nav in nav" :key="_nav.name" class="com-item">
          <span class="title">
            {{ _nav.name }}
          </span>
          <div class="info">
            <template v-for="_package in reorder(_nav.packages)" :key="_package.name">
              <span v-if="_package.show && _package.taro && _package.exportEmpty !== false" class="info n-bg-2 n-text-color">
                <text class="link" @click="navigateTo(_package.name, _nav.enName)">
                  {{ _package.name }}
                &nbsp;&nbsp;
                  {{ _package.cName }}
                </text>
                <nut-icon size="14px" color="#979797" name="right" />
              </span>
            </template>
          </div>
        </div>
      </view>
    </view>
  </nut-config-provider>
</template>

<style lang="scss">
.index {
  height: 100%;
  width: 100%;
  // padding-top: 30px;

  &-header {
    display: flex;
    align-items: center;
    padding: 0 34px;
    height: 117px;

    >image {
      width: 67px;
      height: 67px;
      margin-right: 18px;
      flex-shrink: 0;
    }

    .info {
      display: flex;
      flex-direction: column;

      .title {
        height: 48px;
        line-height: 48px;
        font-size: 34px;
        color: rgba(51, 51, 51, 1);
        font-weight: 500;
      }

      text {
        height: 18px;
        line-height: 18px;
        font-size: 12px;
        color: rgba(154, 155, 157, 1);
      }
    }
  }

  &-components {
    // background: #f7f8fa;
    border-radius: 30px 30px 0 0;
    overflow: hidden;
    padding: 30px 25px;

    >.com-item {
      margin-bottom: 17px;

      >.title {
        line-height: 20px;
        font-size: 14px;
        color: rgba(144, 156, 164, 1);
        margin-bottom: 10px;
      }

      >.info {
        .info {
          display: flex;
          align-items: center;
          padding: 0 24px;
          width: 100%;
          height: 45px;
          line-height: 45px;
          border-radius: 22px;
          // box-shadow: 0px 1px 4px 0px rgba(102, 102, 102, 0.06);
          margin-bottom: 13px;
          box-sizing: border-box;

          .link {
            width: 100%;
            height: 100%;
            font-size: 15px;
            font-weight: bold;
            display: block;
            // color: rgba(51, 51, 51, 1);
          }
        }
      }
    }
  }
}
</style>
