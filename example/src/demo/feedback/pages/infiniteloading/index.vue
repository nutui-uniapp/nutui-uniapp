<script lang="ts">
import { onMounted, reactive, ref, toRefs } from 'vue'

export default {
  props: {},
  setup() {
    const hasMore = ref(true)

    const data = reactive({
      defultList: [''],
    })

    const loadMore = (done: () => void) => {
      setTimeout(() => {
        const curLen = data.defultList.length

        for (let i = curLen; i < curLen + 10; i++)
          data.defultList.push(`${i}`)

        if (data.defultList.length > 30)
          hasMore.value = false

        done()
      }, 500)
    }

    const refresh = (done: () => void) => {
      setTimeout(() => {
        console.log('刷新成功')
        done()
      }, 1000)
    }

    const init = () => {
      for (let i = 0; i < 20; i++)
        data.defultList.push(`${i}`)
    }
    onMounted(() => {
      init()
    })

    return {
      loadMore,
      hasMore,
      refresh,
      ...toRefs(data),
    }
  },
}
</script>

<template>
  <view class="demo">
    <h2>基础演示</h2>
    <nut-cell>
      <view id="scrollDemo" class="infiniteUl">
        <nut-infiniteloading
          pull-icon="JD"
          load-txt="loading"
          load-more-txt="没有啦～"
          :is-open-refresh="true"
          container-id="scrollDemo"
          :has-more="hasMore"
          @load-more="loadMore"
          @refresh="refresh"
        >
          <view v-for="(item, index) in defultList" :key="index" class="infiniteLi">
            {{ item }}
          </view>
        </nut-infiniteloading>
      </view>
    </nut-cell>
  </view>
</template>

<style>
.infiniteUl {
  width: 100%;
  height: 500px;
  padding: 0;
  margin: 0;
  overflow-x: hidden;
  overflow-y: auto;
}

.infiniteLi {
  margin-top: 10px;
  font-size: 14px;
  color: rgb(100 100 100 / 100%);
  text-align: center;
}

.loading {
  display: block;
  width: 100%;
  text-align: center;
}
</style>

<route lang="json">
{
  "style": {
    "navigationBarTitleText": "InfiniteLoading"
  }
}
</route>
