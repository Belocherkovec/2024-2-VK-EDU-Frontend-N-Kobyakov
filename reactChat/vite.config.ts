import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  let base = '/';

  if (command === 'build') {
    base = '/2024-2-VK-EDU-Frontend-N-Kobyakov';
  }

  return {
    base,
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler'
        }
      }
    },
    plugins: [react()],
    resolve: {
      alias: {
        '@': resolve('src')
      }
    },
    server: {
      open: true
    },
  }
});
