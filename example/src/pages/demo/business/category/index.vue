<script lang="ts">
import { onMounted, reactive, toRefs } from 'vue'
// @ts-expect-error TS7016
import { categoryChild, categoryInfo, customCategory } from './data'

/* eslint-disable no-console */

export default {
  setup() {
    const data = reactive({
      category: [{}],
      categoryChild1: [{}],
      customCategory: [{}],
      categoryChild2: [{}],
    })

    onMounted(() => {
      setTimeout(() => {
        data.category = categoryInfo.category
        data.categoryChild1 = categoryChild
        data.customCategory = customCategory
        data.categoryChild2 = categoryChild
      }, 500)
    })

    const change = (index: any) => {
      data.categoryChild1 = [].concat((data.category as any)[index].children)
    }

    const changeText = (index: any) => {
      data.categoryChild2 = [].concat((data.category as any)[index].children)
    }

    const changeCustom = () => {
      console.log('点击分类数据')
    }

    const onChange = () => {
      console.log('当前分类数据')
    }

    return {
      change,
      onChange,
      changeText,
      changeCustom,
      ...toRefs(data),
    }
  },
}
</script>

<template>
  <div class="demo full category-demo">
    <h2 class="title">
      经典分类模式
    </h2>
    <nut-category :category="category" @change="change">
      <nut-category-pane :category-child="categoryChild1" @on-change="onChange" />
    </nut-category>

    <h2 class="title">
      只显示文字
    </h2>
    <nut-category :category="category" @change="changeText">
      <nut-category-pane type="text" :category-child="categoryChild2" @on-change="onChange" />
    </nut-category>

    <h2 class="title">
      自定义分类
    </h2>
    <nut-category>
      <nut-category-pane type="custom" :custom-category="customCategory" @on-change="changeCustom" />
    </nut-category>
  </div>
</template>

<style lang="scss" scoped>
.category-demo {
  padding-left: 0 !important;
  padding-right: 0px !important;
}
</style>

<route lang="json">
{
  "style": {
    "navigationBarTitleText": "Category"
  }
}
</route>
