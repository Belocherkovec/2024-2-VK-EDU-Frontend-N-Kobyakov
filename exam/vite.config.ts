import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'


// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  let base = '/';

  if (command === 'build') {
    base = '/2024-2-VK-EDU-Frontend-N-Kobyakov';
  }


  return {
    base,
    plugins: [react()],
  };
});
