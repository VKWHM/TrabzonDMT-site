import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import symfonyPlugin from "vite-plugin-symfony";


// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        symfonyPlugin(),
    ],
    build: {
        outDir: './public/build',
        emptyOutDir: true,
        manifest: true,
        rollupOptions: {
            input: {
                admin: './assets/admin/main.tsx'
            },
        },
    },
    server: {
        cors: true,
        strictPort: true,
        port: 3000,
    },
});
