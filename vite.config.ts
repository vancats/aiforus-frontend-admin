/// <reference types="vitest" />

import path from 'node:path'
import { defineConfig, loadEnv } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import VueJsx from '@vitejs/plugin-vue-jsx'
import Unocss from 'unocss/vite'
import VueMacros from 'unplugin-vue-macros/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  console.log('env: ', env)
  return defineConfig({
    base: '/',
    server: {
      proxy: {
        '/api/admin/file': {
          target: env.VITE_DOMAIN,
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api\/admin/, ''),
        },
        '/api/admin': {
          target: env.VITE_DOMAIN,
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, ''),
        },
      },
    },
    resolve: {
      alias: {
        '~/': `${path.resolve(__dirname, 'src')}/`,
      },
    },
    plugins: [
      VueMacros({
        plugins: {
          vue: Vue({
            reactivityTransform: true,
          }),
        },
      }),

      // https://github.com/hannoeru/vite-plugin-pages
      Pages(),

      // https://github.com/antfu/unplugin-auto-import
      AutoImport({
        imports: [
          'vue',
          'vue/macros',
          'vue-router',
          '@vueuse/core',
          'pinia',
        ],
        dts: true,
        dirs: [
          './src/composables',
        ],
        vueTemplate: true,
      }),

      // https://github.com/antfu/unocss
      // see unocss.config.ts for config
      Unocss(),

      // https://github.com/antfu/vite-plugin-components
      Components({
        resolvers: [NaiveUiResolver()],
        dts: true,
      }),

      VueJsx(),
    ],

    // https://github.com/vitest-dev/vitest
    test: {
      environment: 'jsdom',
    },
  })
}
