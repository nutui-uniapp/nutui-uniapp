<script lang="ts">
import { reactive, ref } from 'vue'

export default {
  props: {},
  setup() {
    const visible1 = ref(false)
    const visible2 = ref(false)
    const visible3 = ref(false)
    const visible4 = ref(false)
    const visible5 = ref(false)
    const visible6 = ref(false)
    const value = ref('')
    const customKey1 = reactive(['.'])
    const customKey2 = reactive(['.', 'x'])
    const customKey3 = reactive(['X'])
    const visibleArr = [visible1, visible2, visible3, visible4, visible5, visible6]
    function input(number: any) {
      /* eslint-disable no-console */
      console.log(number)
    }
    function showKeyBoard(index: number) {
      visibleArr[index - 1].value = true
    }
    function onDelete() {}
    function close(index: number) {
      visibleArr[index - 1].value = false
    }

    return {
      input,
      onDelete,
      close,
      showKeyBoard,
      customKey1,
      customKey2,
      customKey3,
      visible1,
      visible2,
      visible3,
      visible4,
      visible5,
      visible6,
      value,
    }
  },
}
</script>

<template>
  <div class="demo h-100vh!">
    <nut-cell :is-link="true" title="默认键盘" @click="showKeyBoard(1)" />
    <nut-number-keyboard
      v-model:visible="visible1"
      overlay
      @input="input"
      @delete="onDelete"
      @close="close(1)"
    />
    <nut-cell :is-link="true" title="带右侧栏键盘" @click="showKeyBoard(2)" />
    <nut-number-keyboard
      v-model:visible="visible2"
      type="rightColumn"
      overlay
      :custom-key="customKey1"
      @input="input"
      @close="close(2)"
    />
    <nut-cell :is-link="true" title="随机数键盘" @click="showKeyBoard(3)" />
    <nut-number-keyboard
      v-model:visible="visible3"
      type="rightColumn"
      overlay
      :random-keys="true"
      :custom-key="customKey1"
      @input="input"
      @close="close(3)"
    />

    <nut-cell :is-link="true" title="带标题栏键盘" @click="showKeyBoard(4)" />
    <nut-number-keyboard
      v-model:visible="visible4"
      title="默认键盘"
      overlay
      :custom-key="customKey2"
      @input="input"
      @close="close(4)"
    />
    <nut-cell :is-link="true" title="身份证键盘" @click="showKeyBoard(6)" />
    <nut-number-keyboard
      v-model:visible="visible6"
      overlay
      :custom-key="customKey3"
      @input="input"
      @close="close(6)"
    />
    <nut-cell
      :is-link="true"
      :desc="value"
      title="双向绑定"
      @click="showKeyBoard(5)"
    />
    <nut-number-keyboard
      v-model:visible="visible5"
      v-model="value"
      overlay
      maxlength="6"
      @close="close(5)"
    />
  </div>
</template>

<style lang="scss" scoped>
.nut-button {
  margin-right: 10px;
}
</style>

<route lang="json">
{
  "style": {
    "navigationBarTitleText": "NumberKeyboard"
  }
}
</route>
