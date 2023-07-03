import type { ComponentResolver } from '@uni-helper/vite-plugin-uni-components'

export function NutResolver(): ComponentResolver {
  return {
    type: 'component',
    resolve: (name: string) => {
      if (name.match(/^(Nut[A-Z]|nut-[a-z])/)) {
        const cName = name.slice(3).replace(/([a-z])/, '$1').toLowerCase()
        const component = `uniapp-nutui/components/${cName}/${cName}.vue`
        const style = `uniapp-nutui/components/${cName}/index.scss`

        return {
          name,
          from: component,
          // sideEffects: style,
        }
      }
    },
  }
}
