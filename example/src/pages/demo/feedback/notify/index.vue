<script lang="ts" setup>
import type { NotifyInst, NotifyProps } from 'nutui-uniapp'

const notify = useNotify()

function showPrimary() {
  notify.primary('主要通知')
}

function showSuccess() {
  notify.success('成功通知')
}

function showDanger() {
  notify.danger('危险通知')
}

function showWarning() {
  notify.warning('警告通知')
}

function hide() {
  notify.hide()
}

function showCustomStyle() {
  notify.custom('自定义样式', {
    customColor: '#ad0000',
    background: '#ffe1e1',
  })
}

function showCustomDuration() {
  notify.primary('自定义时长5s', {
    duration: 5000,
  })
}

function showCustomPosition() {
  notify.primary('自定义位置', {
    position: 'bottom',
  })
}

const notifyRef = ref<NotifyInst | null>(null)

function showPrimaryRef() {
  notifyRef.value?.primary('主要通知')
}

function showSuccessRef() {
  notifyRef.value?.success('成功通知')
}

function showDangerRef() {
  notifyRef.value?.danger('危险通知')
}

function showWarningRef() {
  notifyRef.value?.warning('警告通知')
}

const notifyState = ref<Pick<NotifyProps, 'visible' | 'type' | 'msg'>>({
  visible: false,
  type: 'primary',
  msg: '',
})

function showPrimaryProps() {
  notifyState.value = {
    visible: true,
    type: 'primary',
    msg: '主要通知',
  }
}

function showSuccessProps() {
  notifyState.value = {
    visible: true,
    type: 'success',
    msg: '成功通知',
  }
}

function showDangerProps() {
  notifyState.value = {
    visible: true,
    type: 'danger',
    msg: '危险通知',
  }
}

function showWarningProps() {
  notifyState.value = {
    visible: true,
    type: 'warning',
    msg: '警告通知',
  }
}
</script>

<template>
  <div class="demo h-100vh!">
    <h2 class="title">
      组合式函数用法
    </h2>
    <nut-notify />
    <nut-cell title="主要通知" is-link @click="showPrimary" />
    <nut-cell title="成功通知" is-link @click="showSuccess" />
    <nut-cell title="危险通知" is-link @click="showDanger" />
    <nut-cell title="警告通知" is-link @click="showWarning" />
    <nut-cell title="手动关闭通知" is-link @click="hide" />

    <h2 class="title">
      自定义样式
    </h2>
    <nut-cell title="自定义样式" is-link @click="showCustomStyle" />
    <nut-cell title="自定义时长5s" is-link @click="showCustomDuration" />
    <nut-cell title="自定义位置" is-link @click="showCustomPosition" />

    <h2 class="title">
      Ref用法
    </h2>
    <nut-notify ref="notifyRef" selector="xx1" />
    <nut-cell title="主要通知" is-link @click="showPrimaryRef" />
    <nut-cell title="成功通知" is-link @click="showSuccessRef" />
    <nut-cell title="危险通知" is-link @click="showDangerRef" />
    <nut-cell title="警告通知" is-link @click="showWarningRef" />

    <h2 class="title">
      Props用法
    </h2>
    <nut-notify
      v-model:visible="notifyState.visible"
      selector="xx2"
      :type="notifyState.type"
      :msg="notifyState.msg"
    />
    <nut-cell title="主要通知" is-link @click="showPrimaryProps" />
    <nut-cell title="成功通知" is-link @click="showSuccessProps" />
    <nut-cell title="危险通知" is-link @click="showDangerProps" />
    <nut-cell title="警告通知" is-link @click="showWarningProps" />
  </div>
</template>

<route lang="json">
{
  "style": {
    "navigationBarTitleText": "Notify"
  }
}
</route>
