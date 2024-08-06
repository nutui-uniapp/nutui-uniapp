<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'

export default defineComponent({
  setup() {
    const state = reactive({
      show1: false,
      show2: false,
      show3: false,
      width: '80%',
      height: '100%',
    })

    const handleClick1 = () => {
      state.show1 = true
    }

    const handleClick2 = () => {
      state.show2 = true
    }

    const handleClick3 = () => {
      state.show3 = true
    }

    const handleClick4 = (msg: string) => {
      uni.showToast({ title: msg })
    }

    return {
      ...toRefs(state),
      handleClick1,
      handleClick2,
      handleClick3,
      handleClick4,
    }
  },
})
</script>

<template>
  <div class="demo h-100vh!">
    <h2 class="title">
      基础用法
    </h2>
    <nut-cell @click="handleClick1">
      <span><label>右侧</label></span>
    </nut-cell>
    <nut-popup
      v-model:visible="show1"
      :z-index="3000"
      position="right"
      :custom-style="{ width, height }"
    >
      <nut-side-navbar>
        <nut-sub-side-navbar title="智能城市AI" ikey="6">
          <nut-sub-side-navbar title="人体识别1" ikey="9">
            <nut-side-navbar-item ikey="10" title="人体检测1" />
            <nut-side-navbar-item ikey="11" title="细粒度人像分割1" />
          </nut-sub-side-navbar>
          <nut-sub-side-navbar title="人体识别2" ikey="12">
            <nut-side-navbar-item ikey="13" title="人体检测2" />
            <nut-side-navbar-item ikey="14" title="细粒度人像分割2" />
          </nut-sub-side-navbar>
        </nut-sub-side-navbar>
      </nut-side-navbar>
    </nut-popup>
    <nut-cell @click="handleClick2">
      <span><label>左侧</label></span>
    </nut-cell>
    <nut-popup
      v-model:visible="show2"
      :z-index="3000"
      position="left"
      :custom-style="{ width, height }"
    >
      <nut-side-navbar>
        <nut-subside-navbar title="图像理解" ikey="3" :open="false">
          <nut-side-navbaritem ikey="4" title="菜品识别" />
          <nut-side-navbaritem ikey="5" title="拍照购" />
        </nut-subside-navbar>
        <nut-subside-navbar title="自然语言处理" ikey="12">
          <nut-side-navbaritem ikey="13" title="词法分析" />
          <nut-side-navbaritem ikey="14" title="句法分析" />
        </nut-subside-navbar>
      </nut-side-navbar>
    </nut-popup>
    <h2 class="title">
      导航嵌套（建议最多三层）,点击第一条回调
    </h2>
    <div>
      <nut-cell @click="handleClick3">
        <span><label>显示</label></span>
      </nut-cell>
      <nut-popup
        v-model:visible="show3"
        :z-index="3000"
        position="right"
        :custom-style="{ width, height }"
      >
        <nut-side-navbar :show="show3">
          <nut-side-navbaritem ikey="1" title="人脸识别" @click="handleClick4('人脸识别')" />
          <nut-side-navbaritem ikey="2" title="云存自然语言处理" />
          <nut-subside-navbar title="图像理解" ikey="3" :open="false">
            <nut-side-navbaritem ikey="4" title="菜品识别" />
            <nut-side-navbaritem ikey="5" title="拍照购" />
          </nut-subside-navbar>
          <nut-subside-navbar title="智能城市AI" ikey="6">
            <nut-side-navbaritem ikey="7" title="企业风险预警模型" />
            <nut-side-navbaritem ikey="8" title="水质量检测" />
            <nut-subside-navbar title="人体识别" ikey="9">
              <nut-side-navbaritem ikey="10" title="人体检测" />
              <nut-side-navbaritem ikey="11" title="细粒度人像分割" />
            </nut-subside-navbar>
          </nut-subside-navbar>
          <nut-subside-navbar title="自然语言处理" ikey="12">
            <nut-side-navbaritem ikey="13" title="词法分析" />
            <nut-side-navbaritem ikey="14" title="句法分析" />
          </nut-subside-navbar>
        </nut-side-navbar>
      </nut-popup>
    </div>
  </div>
</template>

<route lang="json">
{
  "style": {
    "navigationBarTitleText": "SideNavbar"
  }
}
</route>
