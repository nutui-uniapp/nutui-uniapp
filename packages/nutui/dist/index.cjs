'use strict';

function NutResolver() {
  return {
    type: "component",
    resolve: (name) => {
      if (name.match(/^(Nut[A-Z]|nut-[a-z])/)) {
        const cName = name.slice(3).replace(/([a-z])/, "$1").toLowerCase();
        const component = `uniapp-nutui/components/${cName}/${cName}.vue`;
        const style = `uniapp-nutui/components/${cName}/index.scss`;
        return {
          name,
          from: component,
          sideEffects: style
        };
      }
    }
  };
}

exports.NutResolver = NutResolver;
