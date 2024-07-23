<script lang="ts">
import { reactive, toRefs } from 'vue'
import config from '../../../config'
import { useAppStore } from '@/store'

interface Item {
  version?: string
  name: string
  uni?: boolean
  sort: any
  cName: string
  type: string
  show: boolean
  desc: string
  author: string
  exportEmpty?: boolean
  exclude?: boolean
  cType?: string
  unidoc?: boolean
  exportEmptyUni?: boolean
}
const { darkMode } = storeToRefs(useAppStore())
export default {
  name: 'NutUI',
  setup() {
    const state = reactive({
      nav: config.nav,
    })

    const reorder = (packages: Item): Item => {
      return packages.sort((x: { name: string }, y: { name: string }) => {
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
  <nut-backtop class="index n-bg-2" height="100%">
    <template #content>
      <view class="index-header n-bg-2">
        <image
          src="https://s2.loli.net/2023/08/30/1AxH9rbqi4kvCls.png"
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
          <template v-if="_nav.show">
            <view class="title">
              {{ _nav.name }}
            </view>
            <div class="info">
              <template v-for="_package in reorder(_nav.packages as any)" :key="_package.name">
                <view v-if="_package.show && _package.uni && _package.exportEmpty !== false" class="info n-bg-2 n-text-color">
                  <text class="link" @click="navigateTo(_package.name, _nav.enName)">
                    {{ _package.name }}
                    &nbsp;&nbsp;
                    {{ _package.cName }}
                  </text>
                  <nut-icon size="14px" color="#979797" name="right" />
                </view>
              </template>
            </div>
          </template>
        </div>
      </view>
    </template>
  </nut-backtop>
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
