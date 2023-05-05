import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),
    Components({
    resolvers: [VantResolver()],
  }),],
  server: {
    host: "0.0.0.0",
    proxy: {
      // 代理 /api 请求到 http://localhost:3000/api
      '/api': {
        target: 'http://192.168.3.155:8080/',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
  }
})




