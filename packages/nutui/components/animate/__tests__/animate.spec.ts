import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import Animate from '../animate.vue'
import type { AnimateType } from '../type'
import { sleep } from '../../_utils/unit'

const testType = [
  'shake',
  'ripple',
  'breath',
  'float',
  'slide-right',
  'slide-left',
  'slide-top',
  'slide-bottom',
  'jump',
  'twinkle',
  'flicker',
] as Array<AnimateType>

it('animate: should change classname when using type prop', () => {
  for (let i = 0; i < testType.length; i++) {
    const typeProp = testType[i]
    const wrapper = mount(Animate, {
      props: {
        show: true,
        type: typeProp,
      },
    })

    const animate: any = wrapper.find('.nut-animate__container')
    expect(animate.classes(`nut-animate-${typeProp}`)).toBe(true)
  }
})

it('animate: trigger animate with loop', async () => {
  for (let i = 0; i < testType.length; i++) {
    const typeProp = testType[i]
    const wrapper = mount(Animate, {
      props: {
        type: typeProp,
        loop: true,
      },
    })

    const animate: any = wrapper.find('.nut-animate__container')
    expect(animate.classes('loop')).toBe(true)
    expect(animate.classes(`nut-animate-${typeProp}`)).toBe(true)
  }
})

it('animate: trigger animate', async () => {
  const onClick = vi.fn()
  const typeProp = 'jump'
  const wrapper = mount(Animate, {
    props: {
      type: typeProp,
      action: 'click',
      onClick,
    },
  })

  const animate: any = wrapper.find('.nut-animate__container')
  expect(animate.classes(`nut-animate-${typeProp}`)).toBe(false)
  animate.trigger('click')
  await nextTick()
  expect(onClick).toBeCalled()
  expect(animate.classes('loop')).toBe(false)
  await sleep(100)
  expect(animate.classes(`nut-animate-${typeProp}`)).toBe(true)
})

it('animate: animate duration', async () => {
  const wrapper = mount(Animate, {
    props: {
      type: 'jump',
      duration: 999,
    },
  })

  const animate: any = wrapper.find('.nut-animate__container')
  expect(animate.element.style.animationDuration).toBe('999ms')
})

it('animate: props show & emit animate', async () => {
  const onAnimate = vi.fn()
  const wrapper = mount(Animate, {
    props: {
      show: false,
      type: 'jump',
      onAnimate,
    },
  })

  wrapper.setProps({
    show: true,
  })
  await nextTick()
  expect(onAnimate).toBeCalled()
})
