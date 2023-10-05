import { defineConfig } from 'vite'
<<<<<<< HEAD
import path from 'node:path'
import electron from 'vite-plugin-electron/simple'
=======
>>>>>>> 7ba41fade061d056f0417dad0e0ccf551451c7ba
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
<<<<<<< HEAD
  plugins: [
    react(),
    electron({
      main: {
        // Shortcut of `build.lib.entry`.
        entry: 'electron/main.ts',
      },
      preload: {
        // Shortcut of `build.rollupOptions.input`.
        // Preload scripts may contain Web assets, so use the `build.rollupOptions.input` instead `build.lib.entry`.
        input: path.join(__dirname, 'electron/preload.ts'),
      },
      // Ployfill the Electron and Node.js built-in modules for Renderer process.
      // See 👉 https://github.com/electron-vite/vite-plugin-electron-renderer
      renderer: {},
    }),
  ],
=======
  plugins: [react()],
>>>>>>> 7ba41fade061d056f0417dad0e0ccf551451c7ba
})
