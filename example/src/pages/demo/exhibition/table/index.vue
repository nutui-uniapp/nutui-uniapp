<script lang="ts">
import { defineComponent, h, onMounted, onUnmounted, reactive, toRefs } from 'vue'
import NutButton from 'uniapp-nutui/components/button/button.vue'
import NutIcon from 'uniapp-nutui/components/icon/icon.vue'

export default defineComponent({
  props: {},
  setup() {
    const state = reactive({
      bordered1: false,
      striped: true,
      columns1: [
        {
          title: '姓名',
          key: 'name',
        },
        {
          title: '性别',
          key: 'sex',
        },
        {
          title: '学历',
          key: 'record',
        },
      ],
      columns2: [
        {
          title: '姓名',
          key: 'name',
          align: 'center',
        },
        {
          title: '性别',
          key: 'sex',
        },
        {
          title: '学历',
          key: 'record',
        },
      ],
      columns3: [
        {
          title: '姓名',
          key: 'name',
        },
        {
          title: '性别',
          key: 'sex',
        },
        {
          title: '学历',
          key: 'record',
        },
        {
          title: '年龄',
          key: 'age',
        },
        {
          title: '地址',
          key: 'address',
        },
      ],
      columns4: [
        {
          title: '姓名',
          key: 'name',
          align: 'center',
        },
        {
          title: '性别',
          key: 'sex',
        },
        {
          title: '学历',
          key: 'record',
        },
        {
          title: '操作',
          key: 'render',
        },
      ],
      columns6: [
        {
          title: '姓名',
          key: 'name',
          align: 'center',
          sorter: true,
        },
        {
          title: '性别',
          key: 'sex',
        },
        {
          title: '学历',
          key: 'record',
        },
        {
          title: '年龄',
          key: 'age',
          sorter: (row1: any, row2: any) => {
            return row1.age - row2.age
          },
        },
      ],
      data1: [
        {
          name: 'Tom',
          sex: '男',
          record: '小学',
        },
        {
          name: 'Lucy',
          sex: '女',
          record: '本科',
        },
        {
          name: 'Jack',
          sex: '男',
          record: '高中',
        },
      ],
      data2: [
        {
          name: 'Tom',
          sex: '男',
          record: '小学',
          age: 13,
          address: '北京',
        },
        {
          name: 'Lucy',
          sex: '女',
          record: '本科',
          age: 34,
          address: '上海',
        },
        {
          name: 'Jack',
          sex: '男',
          record: '高中',
          age: 4,
          address: '杭州',
        },
      ],
      data3: [],
      data4: [
        {
          name: 'Tom',
          sex: '男',
          record: '小学',
          render: () => {
            return h(NutButton, { size: 'small', type: 'primary' }, () => 'Hello')
          },
        },
        {
          name: 'Lucy',
          sex: '女',
          record: '本科',
          render: () => {
            return h(NutIcon, { size: '14px', name: 'dongdong' })
          },
        },
        {
          name: 'Jack',
          sex: '男',
          record: '高中',
          render: () => {
            return h(NutButton, { type: 'success', size: 'small' }, () => '编辑按钮')
          },
        },
      ],
      data5: [],
      data6: [
        {
          name: 'Tom',
          sex: '男',
          record: '小学',
          age: 10,
        },
        {
          name: 'Lucy',
          sex: '女',
          record: '本科',
          age: 30,
        },
        {
          name: 'Jack',
          sex: '男',
          record: '高中',
          age: 4,
        },
      ],
      timer: null as any,
      summary: () => {
        return {
          value: '这是总结栏',
          colspan: 5,
        }
      },
    })

    const handleSorter = (item: any) => {
    /* eslint-disable no-console */
      console.log(JSON.stringify(item))
    }

    onMounted(() => {
      state.timer = setTimeout(() => {
        state.data5 = state.data2.slice() as any
      }, 5000)
    })

    onUnmounted(() => {
      state.timer = null
    })

    return {
      ...toRefs(state),
      handleSorter,
    }
  },
})
</script>

<template>
  <div class="demo">
    <h2 class="title">
      基础用法
    </h2>
    <nut-table :columns="columns1" :data="data1" />
    <h2 class="title">
      是否显示边框，文字对齐
    </h2>
    <nut-table :columns="columns2" :data="data1" :bordered="bordered1" />
    <h2 class="title">
      显示总结栏
    </h2>
    <nut-table :columns="columns3" :data="data2" :summary="summary" />
    <h2 class="title">
      条纹、明暗交替
    </h2>
    <nut-table :columns="columns3" :data="data2" :striped="striped" />
    <h2 class="title">
      无数据默认展示，支持自定义
    </h2>
    <nut-table :columns="columns3" :data="data3" />
    <br>
    <nut-table :columns="columns3" :data="data3">
      <template #nodata>
        <div class="no-data">
          这里是自定义展示
        </div>
      </template>
    </nut-table>
    <!-- #ifndef MP -->
    <h2 class="title">
      自定义单元格
    </h2>
    <nut-table :columns="columns4" :data="data4" />
    <!-- #endif -->
    <h2 class="title">
      支持异步渲染(5s之后看效果)
    </h2>
    <nut-table :columns="columns3" :data="data5" />
    <h2 class="title">
      支持排序
    </h2>
    <nut-table :columns="columns6" :data="data6" @sorter="handleSorter" />
  </div>
</template>

<style lang="scss">
.demo {
  padding-bottom: 20px !important;
}
.nut-table {
  background-color: #fff;
}
</style>

<route lang="json">
{
  "style": {
    "navigationBarTitleText": "Table"
  }
}
</route>
