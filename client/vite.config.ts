import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import tsconfigPaths from 'vite-tsconfig-paths'
import svgr from 'vite-plugin-svgr'
import analyze from 'rollup-plugin-analyzer'
import visualize from 'rollup-plugin-visualizer'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh(), tsconfigPaths(), svgr()],
  server: {
    proxy: {
      '/api': 'http://localhost:4001',
    },
  },
  build: {
    rollupOptions: {
      plugins: [analyze(), visualize({ open: true })],
      output: {
        manualChunks: (id) => {
          if (id.includes('react')) {
            return 'react'
          }
          if (id.includes('date')) {
            return 'date'
          }
          if (id.includes('antd')) {
            return 'antd'
          }
          if (id.includes('lodash')) {
            return 'lodash'
          }
          if (id.includes('node_modules')) {
            return 'vendor'
          }
        },
      },
    },
  },
})
