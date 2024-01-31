import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    root: 'assets',
    base: '/dist/',

    build: {
        outDir: resolve(__dirname, 'public/dist'),
        emptyOutDir: true,
        manifest: true,
        target: 'es2018',
        rollupOptions: {
            input: '/js/app.js'
        },
    },

    server: {
        cors: true,
        strictPort: true,
        port: 3000,
    },
});
