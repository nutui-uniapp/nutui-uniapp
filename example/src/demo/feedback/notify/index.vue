<!-- eslint-disable no-console -->

<script lang="ts">
import { reactive, ref } from 'vue'
import { isH5 } from '@uni-helper/uni-env'
import type { NotifyInst } from 'uniapp-nutui'

export default {
  setup() {
    const onClosed = () => console.log('closed')
    const onClick = () => console.log('click')

    const notifyRef = ref<NotifyInst>()
    const typeRef = ref<NotifyInst>()
    const baseState = {
      state: reactive({
        show: false,
        desc: '基础用法',
      }),
      methods: {
        cellClick() {
          baseState.state.show = true
        },
      },
    }

    function notifyStateClick(type: any, desc: string) {
      typeRef.value?.showNotify({
        type,
        msg: desc,
        duration: 500,
      })
    }

    const customState = {
      state: reactive({
        show: false,
        desc: '',
        type: 'primary',
        duration: 3000,
      }),
      methods: {
        cellClick(type: string, desc: string, duration: number) {
          customState.state.show = true
          customState.state.type = type
          customState.state.desc = desc
          customState.state.duration = duration
        },
      },
    }
    const show = ref(false)
    const showNotify = () => {
      show.value = true
      setTimeout(() => {
        show.value = false
      }, 2000)
    }
    const showRefNotify = () => {
      notifyRef.value?.showNotify({
        type: 'danger',
        msg: '使用ref调用,2秒后消失',
        position: 'bottom',
        background: 'skyblue',
      })

      setTimeout(() => {
        notifyRef.value?.hideNotify()
      }, 2000)
    }
    return {
      baseState,
      typeRef,
      customState,
      onClosed,
      onClick,
      show,
      showNotify,
      isH5,
      notifyRef,
      showRefNotify,
      notifyStateClick,
    }
  },
}
</script>

<template>
  <div class="demo full dragDe" :class="{ web: isH5 }">
    <nut-cell-group :title="baseState.state.desc">
      <nut-cell is-link @click="baseState.methods.cellClick">
        {{ baseState.state.desc }}
      </nut-cell>
      <nut-notify
        v-model:visible="baseState.state.show"
        :msg="baseState.state.desc"
        @click="onClick"
        @closed="onClosed"
      />
    </nut-cell-group>

    <nut-cell-group title="ref调用">
      <nut-cell is-link @click="showRefNotify">
        ref调用
      </nut-cell>
      <nut-notify ref="notifyRef" />
    </nut-cell-group>

    <nut-cell-group title="通知类型">
      <nut-notify
        ref="typeRef"
        @click="onClick"
        @closed="onClosed"
      />
      <nut-cell is-link @click="notifyStateClick('primary', '主要通知')">
        主要通知
      </nut-cell>
      <nut-cell is-link @click="notifyStateClick('success', '成功通知')">
        成功通知
      </nut-cell>
      <nut-cell is-link @click="notifyStateClick('danger', '危险通知')">
        危险通知
      </nut-cell>
      <nut-cell is-link @click="notifyStateClick('warning', '警告通知')">
        警告通知
      </nut-cell>
    </nut-cell-group>
    <nut-cell-group title="自定义样式">
      <nut-notify
        v-model:visible="customState.state.show"
        color="#ad0000"
        background="#ffe1e1"
        :type="customState.state.type"
        :msg="customState.state.desc"
        :duration="customState.state.duration"
        @click="onClick"
        @closed="onClosed"
      />
      <nut-cell is-link @click="customState.methods.cellClick('primary', '自定义背景色和字体颜色', 1000)">
        自定义背景色和字体颜色
      </nut-cell>
      <nut-cell is-link @click="customState.methods.cellClick('primary', '自定义时长5s', 5000)">
        自定义时长5s
      </nut-cell>
    </nut-cell-group>
    <nut-cell-group title="组件调用">
      <nut-cell is-link @click="showNotify">
        组件调用
      </nut-cell>
      <nut-notify v-model:visible="show">
        <span>Content</span>
      </nut-notify>
    </nut-cell-group>
  </div>
</template>

<route lang="json">
{
  "style": {
    "navigationBarTitleText": "Notify"
  }
}
</route>
