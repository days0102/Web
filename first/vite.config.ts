/*
 * @Author: Outsider
 * @Date: 2022-01-25 11:49:01
 * @LastEditors: Outsider
 * @LastEditTime: 2022-01-25 14:56:09
 * @Description: In User Settings Edit
 * @FilePath: \first\vite.config.ts
 */
import { fileURLToPath, URL } from 'url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: 'localhost',
    port: 8082,
    open: true,
    https: false,
    proxy: {
      '/api': 'http://localhost:6166/',
    },
  },
})
