// vite.config.ts
import { resolve } from "node:path";
import process from "node:process";
import UniApp from "file:///D:/Code/nw/nutui-uniapp/node_modules/.pnpm/@dcloudio+vite-plugin-uni@3.0.0-4040520250104002_@vueuse+core@11.3.0_vue@3.4.38_typescript@5._iv2valcwo2ocqofouxaygsmncu/node_modules/@dcloudio/vite-plugin-uni/dist/index.js";
import UniComponents from "file:///D:/Code/nw/nutui-uniapp/node_modules/.pnpm/@uni-helper+vite-plugin-uni-components@0.2.0_rollup@4.30.1/node_modules/@uni-helper/vite-plugin-uni-components/dist/index.mjs";
import UniLayouts from "file:///D:/Code/nw/nutui-uniapp/node_modules/.pnpm/@uni-helper+vite-plugin-uni-layouts@0.1.10_rollup@4.30.1/node_modules/@uni-helper/vite-plugin-uni-layouts/dist/index.mjs";
import UniManifest from "file:///D:/Code/nw/nutui-uniapp/node_modules/.pnpm/@uni-helper+vite-plugin-uni-manifest@0.2.7_vite@5.4.11_@types+node@20.17.13_sass@1.78.0_terser@5.37.0_/node_modules/@uni-helper/vite-plugin-uni-manifest/dist/index.mjs";
import UniPages from "file:///D:/Code/nw/nutui-uniapp/node_modules/.pnpm/@uni-helper+vite-plugin-uni-pages@0.2.28_vite@5.4.11_@types+node@20.17.13_sass@1.78.0_terser@5.37.0_/node_modules/@uni-helper/vite-plugin-uni-pages/dist/index.mjs";
import { NutResolver } from "file:///D:/Code/nw/nutui-uniapp/packages/nutui/dist/index.mjs";
import UnoCSS from "file:///D:/Code/nw/nutui-uniapp/node_modules/.pnpm/unocss@65.4.0_postcss@8.5.1_rollup@4.30.1_vite@5.4.11_@types+node@20.17.13_sass@1.78.0_terser_wnbjzd6agzcr53vsz6ucyti77e/node_modules/unocss/dist/vite.mjs";
import AutoImport from "file:///D:/Code/nw/nutui-uniapp/node_modules/.pnpm/unplugin-auto-import@19.0.0_@vueuse+core@11.3.0_vue@3.4.38_typescript@5.6.3___rollup@4.30.1/node_modules/unplugin-auto-import/dist/vite.js";
import { defineConfig } from "file:///D:/Code/nw/nutui-uniapp/node_modules/.pnpm/vite@5.4.11_@types+node@20.17.13_sass@1.78.0_terser@5.37.0/node_modules/vite/dist/node/index.js";
var __vite_injected_original_dirname = "D:\\Code\\nw\\nutui-uniapp\\example";
var vite_config_default = defineConfig({
  root: process.cwd(),
  base: "/ui/",
  resolve: {
    alias: {
      "@/": `${resolve(__vite_injected_original_dirname, "src")}/`
    }
  },
  plugins: [
    UnoCSS(),
    UniComponents({
      deep: true,
      dts: "src/components.d.ts",
      resolvers: [NutResolver()]
    }),
    UniPages({
      minify: true
    }),
    UniManifest({ minify: true }),
    AutoImport({
      imports: [
        "vue",
        "pinia",
        "uni-app",
        {
          "nutui-uniapp/composables": [
            "useNotify",
            "useToast"
          ]
        }
      ],
      dts: "src/auto-imports.d.ts",
      dirs: ["src/composables", "src/stores"],
      vueTemplate: true
    }),
    UniLayouts(),
    // @ts-expect-error whatever
    UniApp.default()
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "nutui-uniapp/styles/variables.scss";'
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxDb2RlXFxcXG53XFxcXG51dHVpLXVuaWFwcFxcXFxleGFtcGxlXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxDb2RlXFxcXG53XFxcXG51dHVpLXVuaWFwcFxcXFxleGFtcGxlXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9Db2RlL253L251dHVpLXVuaWFwcC9leGFtcGxlL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gJ25vZGU6cGF0aCdcclxuaW1wb3J0IHByb2Nlc3MgZnJvbSAnbm9kZTpwcm9jZXNzJ1xyXG5pbXBvcnQgVW5pQXBwIGZyb20gJ0BkY2xvdWRpby92aXRlLXBsdWdpbi11bmknXHJcbmltcG9ydCBVbmlDb21wb25lbnRzIGZyb20gJ0B1bmktaGVscGVyL3ZpdGUtcGx1Z2luLXVuaS1jb21wb25lbnRzJ1xyXG5pbXBvcnQgVW5pTGF5b3V0cyBmcm9tICdAdW5pLWhlbHBlci92aXRlLXBsdWdpbi11bmktbGF5b3V0cydcclxuaW1wb3J0IFVuaU1hbmlmZXN0IGZyb20gJ0B1bmktaGVscGVyL3ZpdGUtcGx1Z2luLXVuaS1tYW5pZmVzdCdcclxuaW1wb3J0IFVuaVBhZ2VzIGZyb20gJ0B1bmktaGVscGVyL3ZpdGUtcGx1Z2luLXVuaS1wYWdlcydcclxuaW1wb3J0IHsgTnV0UmVzb2x2ZXIgfSBmcm9tICdudXR1aS11bmlhcHAnXHJcbmltcG9ydCBVbm9DU1MgZnJvbSAndW5vY3NzL3ZpdGUnXHJcbmltcG9ydCBBdXRvSW1wb3J0IGZyb20gJ3VucGx1Z2luLWF1dG8taW1wb3J0L3ZpdGUnXHJcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXHJcblxyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gIHJvb3Q6IHByb2Nlc3MuY3dkKCksXHJcbiAgYmFzZTogJy91aS8nLFxyXG4gIHJlc29sdmU6IHtcclxuICAgIGFsaWFzOiB7XHJcbiAgICAgICdALyc6IGAke3Jlc29sdmUoX19kaXJuYW1lLCAnc3JjJyl9L2AsXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgcGx1Z2luczogW1xyXG4gICAgVW5vQ1NTKCksXHJcbiAgICBVbmlDb21wb25lbnRzKHtcclxuICAgICAgZGVlcDogdHJ1ZSxcclxuICAgICAgZHRzOiAnc3JjL2NvbXBvbmVudHMuZC50cycsXHJcbiAgICAgIHJlc29sdmVyczogW051dFJlc29sdmVyKCldLFxyXG4gICAgfSksXHJcbiAgICBVbmlQYWdlcyh7XHJcbiAgICAgIG1pbmlmeTogdHJ1ZSxcclxuICAgIH0pLFxyXG4gICAgVW5pTWFuaWZlc3QoeyBtaW5pZnk6IHRydWUgfSksXHJcbiAgICBBdXRvSW1wb3J0KHtcclxuICAgICAgaW1wb3J0czogW1xyXG4gICAgICAgICd2dWUnLFxyXG4gICAgICAgICdwaW5pYScsXHJcbiAgICAgICAgJ3VuaS1hcHAnLFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICdudXR1aS11bmlhcHAvY29tcG9zYWJsZXMnOiBbXHJcbiAgICAgICAgICAgICd1c2VOb3RpZnknLFxyXG4gICAgICAgICAgICAndXNlVG9hc3QnLFxyXG4gICAgICAgICAgXSxcclxuICAgICAgICB9LFxyXG4gICAgICBdLFxyXG4gICAgICBkdHM6ICdzcmMvYXV0by1pbXBvcnRzLmQudHMnLFxyXG4gICAgICBkaXJzOiBbJ3NyYy9jb21wb3NhYmxlcycsICdzcmMvc3RvcmVzJ10sXHJcbiAgICAgIHZ1ZVRlbXBsYXRlOiB0cnVlLFxyXG4gICAgfSksXHJcbiAgICBVbmlMYXlvdXRzKCksXHJcbiAgICAvLyBAdHMtZXhwZWN0LWVycm9yIHdoYXRldmVyXHJcbiAgICBVbmlBcHAuZGVmYXVsdCgpLFxyXG4gIF0sXHJcbiAgY3NzOiB7XHJcbiAgICBwcmVwcm9jZXNzb3JPcHRpb25zOiB7XHJcbiAgICAgIHNjc3M6IHtcclxuICAgICAgICBhZGRpdGlvbmFsRGF0YTogJ0BpbXBvcnQgXCJudXR1aS11bmlhcHAvc3R5bGVzL3ZhcmlhYmxlcy5zY3NzXCI7JyxcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgfSxcclxufSlcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUF5UixTQUFTLGVBQWU7QUFDalQsT0FBTyxhQUFhO0FBQ3BCLE9BQU8sWUFBWTtBQUNuQixPQUFPLG1CQUFtQjtBQUMxQixPQUFPLGdCQUFnQjtBQUN2QixPQUFPLGlCQUFpQjtBQUN4QixPQUFPLGNBQWM7QUFDckIsU0FBUyxtQkFBbUI7QUFDNUIsT0FBTyxZQUFZO0FBQ25CLE9BQU8sZ0JBQWdCO0FBQ3ZCLFNBQVMsb0JBQW9CO0FBVjdCLElBQU0sbUNBQW1DO0FBYXpDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLE1BQU0sUUFBUSxJQUFJO0FBQUEsRUFDbEIsTUFBTTtBQUFBLEVBQ04sU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsTUFBTSxHQUFHLFFBQVEsa0NBQVcsS0FBSyxDQUFDO0FBQUEsSUFDcEM7QUFBQSxFQUNGO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsSUFDUCxjQUFjO0FBQUEsTUFDWixNQUFNO0FBQUEsTUFDTixLQUFLO0FBQUEsTUFDTCxXQUFXLENBQUMsWUFBWSxDQUFDO0FBQUEsSUFDM0IsQ0FBQztBQUFBLElBQ0QsU0FBUztBQUFBLE1BQ1AsUUFBUTtBQUFBLElBQ1YsQ0FBQztBQUFBLElBQ0QsWUFBWSxFQUFFLFFBQVEsS0FBSyxDQUFDO0FBQUEsSUFDNUIsV0FBVztBQUFBLE1BQ1QsU0FBUztBQUFBLFFBQ1A7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxVQUNFLDRCQUE0QjtBQUFBLFlBQzFCO0FBQUEsWUFDQTtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLE1BQ0EsS0FBSztBQUFBLE1BQ0wsTUFBTSxDQUFDLG1CQUFtQixZQUFZO0FBQUEsTUFDdEMsYUFBYTtBQUFBLElBQ2YsQ0FBQztBQUFBLElBQ0QsV0FBVztBQUFBO0FBQUEsSUFFWCxPQUFPLFFBQVE7QUFBQSxFQUNqQjtBQUFBLEVBQ0EsS0FBSztBQUFBLElBQ0gscUJBQXFCO0FBQUEsTUFDbkIsTUFBTTtBQUFBLFFBQ0osZ0JBQWdCO0FBQUEsTUFDbEI7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
