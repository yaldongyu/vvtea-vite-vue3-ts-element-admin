import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [resolve(process.cwd(), "src/icons/svg")],
      // 指定symbolId格式
      symbolId: "icon-[dir]-[name]",

      /**
       * custom dom id
       * @default: __svg__icons__dom__
       */
      customDomId: "__svg__icons__dom__",
    }),
  ],
  resolve: {
    // 配置别名
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  //启动服务配置
  server: {
    host: "0.0.0.0",
    port: 8000,
    open: true,
    https: false,
    proxy: {},
  },
  // 生产环境打包配置
  //去除 console debugger
  build: {
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
});
