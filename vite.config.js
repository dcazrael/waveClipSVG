import reactRefresh from '@vitejs/plugin-react-refresh';
import { defineConfig } from 'vite';
import reactSvgPlugin from 'vite-plugin-react-svg';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh(), reactSvgPlugin({ expandProps: 'end' })],
});
