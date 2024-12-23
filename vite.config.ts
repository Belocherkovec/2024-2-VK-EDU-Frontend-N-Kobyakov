// @ts-nocheck

import react from '@vitejs/plugin-react';
import autoprefixer from 'autoprefixer';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  let base = '/';

  const serverConfig = {
    server: {
      open: true,
      watch: {
        usePolling: true
      }
    }
  };

  if (command === 'build') {
    base = '/2024-2-VK-EDU-Frontend-N-Kobyakov';
  } else {
    serverConfig.server.proxy = {
      '/api': {
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        target: 'https://vkedu-fullstack-div2.ru/api'
      }
    };
  }

  return {
    base,
    css: {
      postcss: {
        plugins: [autoprefixer]
      },
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler'
        }
      }
    },
    plugins: [react(), svgr()],
    resolve: {
      alias: {
        '@': resolve('src')
      }
    },
    ...serverConfig
  };
});
