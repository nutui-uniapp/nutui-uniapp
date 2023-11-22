import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import ActionSheet from '../actionsheet.vue'

it('should render ActionSheet when visible is true', async () => {
  const wrapper = mount(ActionSheet, {
    props: {
      visible: true,
      menuItems: [
        {
          name: '选项一',
        },
        {
          name: '选项二',
        },
        {
          name: '选项三',
        },
      ],
    },
  })
  const menuItem = wrapper.findAll('.nut-action-sheet__item')
  expect(menuItem.length).toBe(3)
})
it('should emit select event after clicking option', async () => {
  const wrapper = mount(ActionSheet, {
    props: {
      visible: true,
      menuItems: [{ name: '选项一' }],
    },
  })
  const menuItem = wrapper.find('.nut-action-sheet__item')
  menuItem.trigger('click')
  await nextTick()
  expect(wrapper.emitted('choose')).toHaveLength(1)
  expect(wrapper.emitted('choose')![0]).toEqual([
    {
      name: '选项一',
    },
    0,
  ])
})

it('should render sure actionsheet when use custom props', () => {
  const wrapper = mount(ActionSheet, {
    props: {
      visible: true,
      optionTag: 'name',
      optionSubTag: 'subname',
      menuItems: [{ name: '选项一', subname: '描述信息' }],
    },
  })

  expect(wrapper.html()).toMatchSnapshot()
  const subdesc = wrapper.find('.nut-action-sheet__subdesc')
  expect(subdesc.html()).toContain('描述信息')
})

it('should render sure choose when use choose-tag-value', async () => {
  const wrapper = mount(ActionSheet, {
    props: {
      visible: true,
      chooseTagValue: '选项一',
      menuItems: [{ name: '选项一' }, { name: '选项二' }],
    },
  })
  const item = wrapper.findAll<HTMLElement>('.nut-action-sheet__item')
  expect(item[0].element.style.color).toContain('238, 10, 36')
})

it('should render sure color when use color', async () => {
  const wrapper = mount(ActionSheet, {
    props: {
      visible: true,
      chooseTagValue: '选项一',
      customColor: 'green',
      menuItems: [{ name: '选项一' }, { name: '选项二' }],
    },
  })
  const item = wrapper.findAll<HTMLElement>('.nut-action-sheet__item')
  expect(item[0].element.style.color).toContain('green')
})

it('should not emit select event after clicking disabled option', async () => {
  const wrapper = mount(ActionSheet, {
    props: {
      visible: true,
      menuItems: [{ name: '选项一', disabled: true }],
    },
  })

  wrapper.find('.nut-action-sheet__item').trigger('click')
  await nextTick()
  expect(wrapper.emitted('select')).toBeFalsy()
})

it('should render description when use description', async () => {
  const wrapper = mount(ActionSheet, {
    props: {
      visible: true,
      description: '这是一段描述信息',
      title: '主标题',
      menuItems: [{ name: '选项一', disabled: true }],
    },
  })
  const desc = wrapper.find('.nut-action-sheet__desc')
  const title = wrapper.find('.nut-action-sheet__title')
  expect(desc.exists()).toBeTruthy()
  expect(title.exists()).toBeTruthy()
})

it('should emit cancel event after clicking cancel ', () => {
  const wrapper = mount(ActionSheet, {
    props: {
      visible: true,
      menuItems: [{ name: '选项一' }],
      cancelTxt: '取消',
    },
  })
  wrapper.find('.nut-action-sheet__cancel').trigger('click')
  expect(wrapper.emitted('cancel')).toHaveLength(1)
})
