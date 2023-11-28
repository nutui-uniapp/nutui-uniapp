import { config, mount } from '@vue/test-utils'
import Backtop from '../backtop.vue'
import Icon from '../../icon/icon.vue'

beforeAll(() => {
  config.global.components = {
    Icon,
  }
})

afterAll(() => {
  config.global.components = {}
})

it('backtop show', () => {
  const wrapper = mount(Backtop)
  const backtop = wrapper.find('.nut-backtop')
  expect(backtop.exists()).toBe(true)
})

it('backtop style', () => {
  const wrapper = mount(Backtop, {
    props: {
      bottom: 50,
    },
  })
  const backtop: any = wrapper.find('.nut-backtop')
  expect(backtop.element.style.bottom).toBe('50px')
})

// it('backtop style,backtop show', async () => {
//   const wrapper = mount(Backtop, {
//     props: {
//       right: 40,
//     },
//   })
//   await mockScrollTop(1000)
//   const show: any = wrapper.find('.show')

//   expect(show.exists()).toBe(true)
//   const backtop: any = wrapper.find('.nut-backtop')
//   expect(backtop.element.style.right).toBe('40px')
// })

// it('backtop style, show', async () => {
//   const wrapper = mount(Backtop, {
//     props: {
//       zIndex: 100,
//       distance: 0,
//     },
//   })
//   await nextTick()
//   const backtop: any = wrapper.find('.nut-backtop')
//   const show: any = wrapper.find('.show')
//   expect(backtop.element.style.zIndex).toBe('100')
//   expect(show.exists()).toBe(true)
// })
